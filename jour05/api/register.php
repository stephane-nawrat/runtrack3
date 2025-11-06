<?php
// ============================================================================
// API : INSCRIPTION UTILISATEUR
// ============================================================================

require_once '../config/database.php';

// Headers JSON
header('Content-Type: application/json');

// Vérifier méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

// Initialiser tableau d'erreurs
$errors = [];

// ============================================================================
// VALIDATION CÔTÉ SERVEUR (SÉCURITÉ)
// ============================================================================

// Prénom
if (empty($input['prenom'])) {
    $errors['prenom'] = 'Le prénom est obligatoire';
} elseif (strlen($input['prenom']) < 2) {
    $errors['prenom'] = 'Le prénom doit contenir au moins 2 caractères';
} elseif (!preg_match('/^[a-zA-ZÀ-ÿ\s-]+$/', $input['prenom'])) {
    $errors['prenom'] = 'Le prénom contient des caractères invalides';
}

// Nom
if (empty($input['nom'])) {
    $errors['nom'] = 'Le nom est obligatoire';
} elseif (strlen($input['nom']) < 2) {
    $errors['nom'] = 'Le nom doit contenir au moins 2 caractères';
} elseif (!preg_match('/^[a-zA-ZÀ-ÿ\s-]+$/', $input['nom'])) {
    $errors['nom'] = 'Le nom contient des caractères invalides';
}

// Email
if (empty($input['email'])) {
    $errors['email'] = 'L\'email est obligatoire';
} elseif (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Format d\'email invalide';
} else {
    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE email = ?");
    $stmt->execute([$input['email']]);
    if ($stmt->fetch()) {
        $errors['email'] = 'Cet email est déjà utilisé';
    }
}

// Mot de passe
if (empty($input['password'])) {
    $errors['password'] = 'Le mot de passe est obligatoire';
} elseif (strlen($input['password']) < 8) {
    $errors['password'] = 'Le mot de passe doit contenir au moins 8 caractères';
} elseif (!preg_match('/[a-z]/', $input['password'])) {
    $errors['password'] = 'Le mot de passe doit contenir au moins une minuscule';
} elseif (!preg_match('/[A-Z]/', $input['password'])) {
    $errors['password'] = 'Le mot de passe doit contenir au moins une majuscule';
} elseif (!preg_match('/[0-9]/', $input['password'])) {
    $errors['password'] = 'Le mot de passe doit contenir au moins un chiffre';
} elseif (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $input['password'])) {
    $errors['password'] = 'Le mot de passe doit contenir au moins un caractère spécial';
}

// Si erreurs, renvoyer
if (!empty($errors)) {
    echo json_encode([
        'success' => false,
        'message' => 'Veuillez corriger les erreurs',
        'errors' => $errors
    ]);
    exit;
}

// ============================================================================
// INSERTION EN BASE DE DONNÉES
// ============================================================================

try {
    // Hasher le mot de passe
    $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT);

    // Préparer la requête
    $stmt = $pdo->prepare(
        "INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)"
    );

    // Exécuter
    $result = $stmt->execute([
        $input['nom'],
        $input['prenom'],
        $input['email'],
        $hashedPassword
    ]);

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Inscription réussie'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors de l\'inscription'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur serveur'
    ]);
}
