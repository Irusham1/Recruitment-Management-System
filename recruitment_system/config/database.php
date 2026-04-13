<?php
/* ============================================================
   TalentFlow — config/database.php
   MySQL connection & helper utilities
   ============================================================ */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'talentflow_db');
define('UPLOAD_DIR', __DIR__ . '/../uploads/cvs/');

/* ── Connect ──────────────────────────────────────────────── */
function db(): mysqli {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}

/* ── JSON helpers ─────────────────────────────────────────── */
function json_ok(mixed $data, int $code = 200): never {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function json_err(string $msg, int $code = 400): never {
    json_ok(['error' => $msg], $code);
}

/* ── Request helpers ──────────────────────────────────────── */
function method(): string {
    return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
}

function body(): array {
    $raw = file_get_contents('php://input');
    return (array) json_decode($raw, true);
}

function param(string $key, mixed $default = null): mixed {
    return $_GET[$key] ?? $default;
}

/* ── CORS (development) ───────────────────────────────────── */
function cors(): void {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if (method() === 'OPTIONS') { http_response_code(204); exit; }
}
