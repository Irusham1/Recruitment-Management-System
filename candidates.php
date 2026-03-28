<?php
// ============================================================
// api/candidates.php — Candidate list & search
// ============================================================
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { jsonResponse([]); }

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$conn   = getDBConnection();

if ($method === 'GET') {
    if ($id) {
        $stmt = $conn->prepare("
            SELECT c.*,
                   GROUP_CONCAT(j.title SEPARATOR ', ') AS applied_jobs,
                   MAX(a.stage) AS latest_stage
            FROM candidates c
            JOIN applications a ON a.candidate_id = c.id
            JOIN jobs j         ON j.id = a.job_id
            WHERE c.id = ?
            GROUP BY c.id
        ");
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $cand = $stmt->get_result()->fetch_assoc();
        if (!$cand) { jsonResponse(['error' => 'Candidate not found'], 404); }
        jsonResponse($cand);
    }

    $search = $conn->real_escape_string($_GET['q'] ?? '');
    $sql = "SELECT c.*, COUNT(a.id) AS application_count
            FROM candidates c
            LEFT JOIN applications a ON a.candidate_id = c.id";
    if ($search) {
        $sql .= " WHERE c.full_name LIKE '%$search%' OR c.email LIKE '%$search%'";
    }
    $sql .= " GROUP BY c.id ORDER BY c.created_at DESC";
    $result = $conn->query($sql);
    $list = [];
    while ($row = $result->fetch_assoc()) { $list[] = $row; }
    jsonResponse($list);
}

jsonResponse(['error' => 'Method not allowed'], 405);
$conn->close();
