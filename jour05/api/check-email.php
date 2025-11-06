<?php
// ============================================================================
// API : VÉRIFIER SI EMAIL EXISTE
// ============================================================================

require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['email'])) {
    echo json_encode(['exists' => false]);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
$stmt->execute([$input['email']]);
$exists = $stmt->fetch() !== false;

echo json_encode(['exists' => $exists]);
