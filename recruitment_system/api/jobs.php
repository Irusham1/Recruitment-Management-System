<?php
/* ============================================================
   TalentFlow — api/jobs.php
   GET / POST / PUT / DELETE job listings
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

    if ($id) {
        $stmt = $db->prepare('SELECT * FROM jobs WHERE id = ?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $row ? json_ok($row) : json_err('Job not found', 404);
    }

    $status = param('status');
    if ($status) {
        $stmt = $db->prepare('SELECT * FROM jobs WHERE status = ? ORDER BY created_at DESC');
        $stmt->bind_param('s', $status);
        $stmt->execute();
        json_ok($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
    }

    $result = $db->query('SELECT * FROM jobs ORDER BY created_at DESC');
    json_ok($result->fetch_all(MYSQLI_ASSOC));
}

/* ── POST ─────────────────────────────────────────────────── */
function handlePost(): never {
    $data = body();
    $required = ['title', 'department', 'location', 'job_type'];
    foreach ($required as $field) {
        if (empty($data[$field])) json_err("Missing required field: $field");
    }

    $db   = db();
    $stmt = $db->prepare(
        'INSERT INTO jobs (title, department, location, job_type, description, status) VALUES (?,?,?,?,?,?)'
    );
    $status = $data['status'] ?? 'open';
    $desc   = $data['description'] ?? '';
    $stmt->bind_param('ssssss',
        $data['title'], $data['department'], $data['location'],
        $data['job_type'], $desc, $status
    );
    $stmt->execute();
    json_ok(['id' => $db->insert_id, 'message' => 'Job created'], 201);
}

/* ── PUT ──────────────────────────────────────────────────── */
function handlePut(?int $id): never {
    if (!$id) json_err('Job ID required');
    $data = body();

    $allowed = ['title','department','location','job_type','description','status'];
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
    $stmt   = $db->prepare('UPDATE jobs SET ' . implode(', ', $sets) . ' WHERE id = ?');
    $stmt->bind_param($types, ...$vals);
    $stmt->execute();
    $stmt->affected_rows > 0 ? json_ok(['message' => 'Updated']) : json_err('Job not found', 404);
}

/* ── DELETE ───────────────────────────────────────────────── */
function handleDelete(?int $id): never {
    if (!$id) json_err('Job ID required');
    $db   = db();
    $stmt = $db->prepare('DELETE FROM jobs WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->affected_rows > 0 ? json_ok(['message' => 'Deleted']) : json_err('Job not found', 404);
}
