<?php
/* ============================================================
   TalentFlow — api/applications.php
   Applications + CV file upload
   ============================================================ */

require_once __DIR__ . '/../config/database.php';
cors();

$id = param('id') ? (int) param('id') : null;

match(method()) {
    'GET'    => handleGet($id),
    'POST'   => handlePost(),
    'PUT'    => handlePut($id),
    'DELETE' => handleDelete($id),
    default  => json_err('Method not allowed', 405),
};

/* ── GET ──────────────────────────────────────────────────── */
function handleGet(?int $id): never {
    $db = db();

    $sql = '
        SELECT a.*, c.name AS candidate_name, c.email AS candidate_email, c.phone AS candidate_phone,
               j.title AS job_title, j.department
        FROM   applications a
        JOIN   candidates   c ON c.id = a.candidate_id
        JOIN   jobs         j ON j.id = a.job_id
    ';

    if ($id) {
        $stmt = $db->prepare($sql . ' WHERE a.id = ?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $row ? json_ok($row) : json_err('Application not found', 404);
    }

    $where = [];
    $types = '';
    $vals  = [];

    if ($stage = param('stage')) { $where[] = 'a.stage = ?'; $types .= 's'; $vals[] = $stage; }
    if ($jobId = param('job_id')) { $where[] = 'a.job_id = ?'; $types .= 'i'; $vals[] = (int) $jobId; }

    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY a.applied_at DESC';

    if ($vals) {
        $stmt = $db->prepare($sql);
        $stmt->bind_param($types, ...$vals);
        $stmt->execute();
        json_ok($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
    }

    json_ok($db->query($sql)->fetch_all(MYSQLI_ASSOC));
}

/* ── POST (multipart with CV upload) ─────────────────────── */
function handlePost(): never {
    $required = ['job_id', 'candidate_name', 'candidate_email'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) json_err("Missing required field: $field");
    }

    $db = db();

    // Upsert candidate
    $name  = trim($_POST['candidate_name']);
    $email = trim($_POST['candidate_email']);
    $phone = trim($_POST['candidate_phone'] ?? '');

    $stmt = $db->prepare('INSERT INTO candidates (name, email, phone) VALUES (?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone)');
    $stmt->bind_param('sss', $name, $email, $phone);
    $stmt->execute();
    $candidateId = $stmt->insert_id ?: getCandidateId($db, $email);

    // Handle CV upload
    $cvFilename = null;
    if (!empty($_FILES['cv']['tmp_name'])) {
        $file     = $_FILES['cv'];
        $allowed  = ['application/pdf',
                     'application/msword',
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        $maxSize  = 5 * 1024 * 1024;

        if (!in_array($file['type'], $allowed)) json_err('Only PDF and Word files are allowed.');
        if ($file['size'] > $maxSize)           json_err('File size must be under 5 MB.');

        $ext        = pathinfo($file['name'], PATHINFO_EXTENSION);
        $cvFilename = uniqid('cv_', true) . '.' . strtolower($ext);
        $dest       = UPLOAD_DIR . $cvFilename;

        if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);
        if (!move_uploaded_file($file['tmp_name'], $dest)) json_err('CV upload failed.');
    }

    $jobId = (int) $_POST['job_id'];
    $stmt  = $db->prepare('INSERT INTO applications (job_id, candidate_id, cv_filename) VALUES (?,?,?)');
    $stmt->bind_param('iis', $jobId, $candidateId, $cvFilename);
    $stmt->execute();
    json_ok(['id' => $db->insert_id, 'message' => 'Application submitted'], 201);
}

function getCandidateId(mysqli $db, string $email): int {
    $stmt = $db->prepare('SELECT id FROM candidates WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    return (int) ($row['id'] ?? 0);
}

/* ── PUT ──────────────────────────────────────────────────── */
function handlePut(?int $id): never {
    if (!$id) json_err('Application ID required');
    $data = body();

    $allowed = ['stage', 'notes'];
    $sets    = [];
    $types   = '';
    $vals    = [];
    foreach ($allowed as $field) {
        if (isset($data[$field])) {
            $sets[]  = "$field = ?";
            $types  .= 's';
            $vals[]  = $data[$field];
        }
    }
    if (!$sets) json_err('No fields to update');

    $types .= 'i';
    $vals[] = $id;
    $db     = db();
    $stmt   = $db->prepare('UPDATE applications SET ' . implode(', ', $sets) . ' WHERE id = ?');
    $stmt->bind_param($types, ...$vals);
    $stmt->execute();
    $stmt->affected_rows > 0 ? json_ok(['message' => 'Updated']) : json_err('Application not found', 404);
}

/* ── DELETE ───────────────────────────────────────────────── */
function handleDelete(?int $id): never {
    if (!$id) json_err('Application ID required');
    $db   = db();
    $stmt = $db->prepare('DELETE FROM applications WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->affected_rows > 0 ? json_ok(['message' => 'Deleted']) : json_err('Application not found', 404);
}
