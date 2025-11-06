<?php
// ============================================================================
// API : CONNEXION UTILISATEUR
// ============================================================================

require_once '../config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Validation simple
if (empty($input['email']) || empty($input['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Email et mot de passe requis'
    ]);
    exit;
}

// Rechercher l'utilisateur
$stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = ?");
$stmt->execute([$input['email']]);
$user = $stmt->fetch();

// Vérifier si l'utilisateur existe et si le mot de passe est correct
if ($user && password_verify($input['password'], $user['password'])) {
    // Créer la session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_prenom'] = $user['prenom'];

    echo json_encode([
        'success' => true,
        'message' => 'Connexion réussie',
        'user' => [
            'id' => $user['id'],
            'prenom' => $user['prenom'],
            'email' => $user['email']
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Email ou mot de passe incorrect'
    ]);
}
