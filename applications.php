<?php
// ============================================================
// api/applications.php — CRUD + CV file upload
// ============================================================
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { jsonResponse([]); }

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$conn   = getDBConnection();

switch ($method) {

    // ---- LIST / GET ONE ----
    case 'GET':
        if ($id) {
            $stmt = $conn->prepare("
                SELECT a.*, c.full_name, c.email, c.phone, j.title AS job_title, j.department
                FROM applications a
                JOIN candidates c ON c.id = a.candidate_id
                JOIN jobs j       ON j.id = a.job_id
                WHERE a.id = ?
            ");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $app = $stmt->get_result()->fetch_assoc();
            if (!$app) { jsonResponse(['error' => 'Application not found'], 404); }
            jsonResponse($app);
        }

        $stage = $_GET['stage']  ?? null;
        $jobId = isset($_GET['job_id']) ? (int)$_GET['job_id'] : null;

        $sql = "SELECT a.*, c.full_name, c.email, c.phone, j.title AS job_title, j.department
                FROM applications a
                JOIN candidates c ON c.id = a.candidate_id
                JOIN jobs j       ON j.id = a.job_id
                WHERE 1=1";
        if ($stage) { $sql .= " AND a.stage = '"  . $conn->real_escape_string($stage)  . "'"; }
        if ($jobId) { $sql .= " AND a.job_id = $jobId"; }
        $sql .= " ORDER BY a.applied_at DESC";

        $result = $conn->query($sql);
        $apps = [];
        while ($row = $result->fetch_assoc()) { $apps[] = $row; }
        jsonResponse($apps);
        break;

    // ---- CREATE (with optional CV upload via multipart/form-data) ----
    case 'POST':
        // Accept both JSON body and multipart form
        $isMultipart = strpos($_SERVER['CONTENT_TYPE'] ?? '', 'multipart') !== false;
        $data = $isMultipart ? $_POST : getInput();

        $required = ['candidate_name', 'candidate_email', 'job_id'];
        foreach ($required as $f) {
            if (empty($data[$f])) { jsonResponse(['error' => "Field '$f' is required"], 422); }
        }

        // Upsert candidate
        $name  = $data['candidate_name'];
        $email = $data['candidate_email'];
        $phone = $data['candidate_phone'] ?? '';

        $stmt = $conn->prepare("INSERT INTO candidates (full_name, email, phone) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name), phone=VALUES(phone)");
        $stmt->bind_param('sss', $name, $email, $phone);
        $stmt->execute();

        $stmt = $conn->prepare("SELECT id FROM candidates WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $candId = $stmt->get_result()->fetch_assoc()['id'];
        $jobId  = (int)$data['job_id'];

        // CV upload
        $cvFilename = null;
        if (isset($_FILES['cv']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
            $allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!in_array($_FILES['cv']['type'], $allowed)) {
                jsonResponse(['error' => 'CV must be PDF or Word document'], 422);
            }
            if ($_FILES['cv']['size'] > 5 * 1024 * 1024) {
                jsonResponse(['error' => 'CV file size must be under 5MB'], 422);
            }
            $uploadDir = '../uploads/cvs/';
            if (!is_dir($uploadDir)) { mkdir($uploadDir, 0755, true); }
            $ext        = pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION);
            $cvFilename = uniqid("cv_{$candId}_") . ".$ext";
            move_uploaded_file($_FILES['cv']['tmp_name'], $uploadDir . $cvFilename);
        }

        $cover = $data['cover_letter'] ?? '';
        $stmt = $conn->prepare("INSERT INTO applications (candidate_id, job_id, cv_filename, cover_letter) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE cv_filename=VALUES(cv_filename)");
        $stmt->bind_param('iiss', $candId, $jobId, $cvFilename, $cover);
        if ($stmt->execute()) {
            jsonResponse(['message' => 'Application submitted', 'id' => $conn->insert_id], 201);
        }
        jsonResponse(['error' => 'You may have already applied for this position'], 409);
        break;

    // ---- UPDATE STAGE / NOTES ----
    case 'PUT':
        if (!$id) { jsonResponse(['error' => 'Application ID required'], 400); }
        $data = getInput();
        $fields = [];
        $types  = '';
        $values = [];
        foreach (['stage', 'notes', 'score'] as $f) {
            if (isset($data[$f])) { $fields[] = "$f = ?"; $types .= 's'; $values[] = $data[$f]; }
        }
        if (!$fields) { jsonResponse(['error' => 'Nothing to update'], 400); }
        $values[] = $id;
        $stmt = $conn->prepare("UPDATE applications SET " . implode(', ', $fields) . " WHERE id = ?");
        $stmt->bind_param($types . 'i', ...$values);
        $stmt->execute();
        jsonResponse(['message' => 'Application updated', 'affected' => $stmt->affected_rows]);
        break;

    // ---- DELETE ----
    case 'DELETE':
        if (!$id) { jsonResponse(['error' => 'Application ID required'], 400); }
        $stmt = $conn->prepare("DELETE FROM applications WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        jsonResponse(['message' => 'Application deleted']);
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

$conn->close();
