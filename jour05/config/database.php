<?php
// ============================================================================
// CONFIGURATION BASE DE DONNÉES
// ============================================================================

// Démarrer la session (si pas déjà démarrée)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Paramètres de connexion
define('DB_HOST', 'localhost');
define('DB_NAME', 'phase02_projet');
define('DB_USER', 'root');
define('DB_PASS', 'root');

try {
    // Connexion PDO
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    // En production, ne pas afficher le message d'erreur détaillé
    die(json_encode([
        'success' => false,
        'message' => 'Erreur de connexion à la base de données'
    ]));
}

// Fonction pour vérifier si l'utilisateur est connecté
function isLoggedIn()
{
    return isset($_SESSION['user_id']);
}

// Fonction pour récupérer l'utilisateur connecté
function getCurrentUser($pdo)
{
    if (!isLoggedIn()) {
        return null;
    }

    $stmt = $pdo->prepare("SELECT id, nom, prenom, email FROM utilisateurs WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch();
}
