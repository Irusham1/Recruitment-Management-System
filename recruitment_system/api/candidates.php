<?php
/* ============================================================
   TalentFlow — api/candidates.php
   Candidate search & listing
   ============================================================ */

require_once __DIR__ . '/../config/database.php';
cors();

$id = param('id') ? (int) param('id') : null;

if (method() !== 'GET') json_err('Method not allowed', 405);

$db = db();

/* ── Single candidate ─────────────────────────────────────── */
if ($id) {
    $stmt = $db->prepare('
        SELECT c.*,
               COUNT(a.id)                        AS application_count,
               GROUP_CONCAT(a.stage ORDER BY a.applied_at DESC SEPARATOR ",") AS stages
        FROM   candidates c
        LEFT JOIN applications a ON a.candidate_id = c.id
        WHERE  c.id = ?
        GROUP  BY c.id
    ');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $row ? json_ok($row) : json_err('Candidate not found', 404);
}

/* ── Search ───────────────────────────────────────────────── */
if ($q = param('q')) {
    $like = '%' . $db->real_escape_string($q) . '%';
    $stmt = $db->prepare('
        SELECT c.*,
               COUNT(a.id) AS application_count
        FROM   candidates c
        LEFT JOIN applications a ON a.candidate_id = c.id
        WHERE  c.name LIKE ? OR c.email LIKE ?
        GROUP  BY c.id
        ORDER  BY c.name
    ');
    $stmt->bind_param('ss', $like, $like);
    $stmt->execute();
    json_ok($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
}

/* ── All candidates ───────────────────────────────────────── */
$result = $db->query('
    SELECT c.*,
           COUNT(a.id) AS application_count
    FROM   candidates c
    LEFT JOIN applications a ON a.candidate_id = c.id
    GROUP  BY c.id
    ORDER  BY c.name
');
json_ok($result->fetch_all(MYSQLI_ASSOC));
