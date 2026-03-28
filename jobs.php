<?php
// ============================================================
// api/jobs.php  — CRUD for job listings
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
            $stmt = $conn->prepare("SELECT * FROM jobs WHERE id = ?");
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $job = $stmt->get_result()->fetch_assoc();
            if (!$job) { jsonResponse(['error' => 'Job not found'], 404); }

            // Application count
            $cStmt = $conn->prepare("SELECT COUNT(*) AS cnt FROM applications WHERE job_id = ?");
            $cStmt->bind_param('i', $id);
            $cStmt->execute();
            $job['application_count'] = $cStmt->get_result()->fetch_assoc()['cnt'];
            jsonResponse($job);
        }

        $status = $_GET['status'] ?? null;
        $sql = "SELECT j.*, (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) AS application_count FROM jobs j";
        if ($status) { $sql .= " WHERE j.status = '" . $conn->real_escape_string($status) . "'"; }
        $sql .= " ORDER BY j.created_at DESC";
        $result = $conn->query($sql);
        $jobs = [];
        while ($row = $result->fetch_assoc()) { $jobs[] = $row; }
        jsonResponse($jobs);
        break;

    // ---- CREATE ----
    case 'POST':
        $data = getInput();
        $required = ['title', 'department', 'location', 'job_type', 'description'];
        foreach ($required as $field) {
            if (empty($data[$field])) { jsonResponse(['error' => "Field '$field' is required"], 422); }
        }
        $icons = ['Engineering'=>'💻','Design'=>'🎨','Marketing'=>'📈','Sales'=>'🤝','HR'=>'👥','Finance'=>'💰','Operations'=>'⚙️'];
        $icon  = $icons[$data['department']] ?? '💼';
        $status = $data['status'] ?? 'open';

        $stmt = $conn->prepare("INSERT INTO jobs (title, department, location, job_type, salary, status, deadline, description, requirements, benefits, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('sssssssssss',
            $data['title'], $data['department'], $data['location'], $data['job_type'],
            $data['salary'], $status, $data['deadline'],
            $data['description'], $data['requirements'], $data['benefits'], $icon
        );
        if ($stmt->execute()) {
            jsonResponse(['message' => 'Job created', 'id' => $conn->insert_id], 201);
        }
        jsonResponse(['error' => 'Failed to create job'], 500);
        break;

    // ---- UPDATE ----
    case 'PUT':
        if (!$id) { jsonResponse(['error' => 'Job ID required'], 400); }
        $data = getInput();
        $fields = [];
        $types  = '';
        $values = [];
        $allowed = ['title','department','location','job_type','salary','status','deadline','description','requirements','benefits'];
        foreach ($allowed as $f) {
            if (isset($data[$f])) { $fields[] = "$f = ?"; $types .= 's'; $values[] = $data[$f]; }
        }
        if (!$fields) { jsonResponse(['error' => 'No fields to update'], 400); }
        $values[] = $id;
        $stmt = $conn->prepare("UPDATE jobs SET " . implode(', ', $fields) . " WHERE id = ?");
        $stmt->bind_param($types . 'i', ...$values);
        $stmt->execute();
        jsonResponse(['message' => 'Job updated', 'affected' => $stmt->affected_rows]);
        break;

    // ---- DELETE ----
    case 'DELETE':
        if (!$id) { jsonResponse(['error' => 'Job ID required'], 400); }
        $stmt = $conn->prepare("DELETE FROM jobs WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        jsonResponse(['message' => 'Job deleted', 'affected' => $stmt->affected_rows]);
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

$conn->close();
