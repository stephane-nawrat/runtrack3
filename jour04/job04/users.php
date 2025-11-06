<?php
// ============================================================================
// BACKEND : API qui renvoie les utilisateurs en JSON
// ============================================================================

// IMPORTANT : Indiquer au navigateur qu'on renvoie du JSON
header('Content-Type: application/json; charset=utf-8');

// Permettre les requêtes AJAX depuis n'importe quel domaine (CORS)
header('Access-Control-Allow-Origin: *');

// ============================================================================
// ÉTAPE 1 : Connexion à la base de données MySQL
// ============================================================================

// Paramètres de connexion (à adapter selon ton environnement)
$host = 'localhost';        // Adresse du serveur MySQL
$dbname = 'phase02_runtrack3';  // Nom de la base de données
$username = 'root';         // Nom d'utilisateur MySQL
$password = 'root';             // Mot de passe MySQL (vide par défaut sur MAMP/XAMPP)

try {
    // Créer une connexion PDO (PHP Data Objects)
    // PDO = interface PHP pour communiquer avec MySQL
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,  // Activer les exceptions en cas d'erreur
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC  // Retourner des tableaux associatifs
        ]
    );

    // ========================================================================
    // ÉTAPE 2 : Récupérer tous les utilisateurs
    // ========================================================================

    // Préparer la requête SQL
    $query = "SELECT id, nom, prenom, email FROM utilisateurs ORDER BY id ASC";

    // Exécuter la requête
    $stmt = $pdo->query($query);

    // Récupérer tous les résultats sous forme de tableau
    $users = $stmt->fetchAll();

    // ========================================================================
    // ÉTAPE 3 : Renvoyer les données en JSON
    // ========================================================================

    // Convertir le tableau PHP en JSON
    // json_encode() transforme un tableau/objet PHP en chaîne JSON
    echo json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    // ========================================================================
    // GESTION D'ERREUR : Si la connexion ou la requête échoue
    // ========================================================================

    // Renvoyer une erreur en JSON
    http_response_code(500);  // Code HTTP 500 = Erreur serveur
    echo json_encode([
        'error' => 'Erreur de base de données',
        'message' => $e->getMessage()
    ]);
}

/* ============================================================================
PSEUDO-CODE

DÉFINIR en-têtes HTTP (JSON, CORS)

ESSAYER
    Créer connexion PDO à MySQL
    Préparer requête SELECT
    Exécuter requête
    Récupérer tous les résultats dans un tableau
    Convertir tableau en JSON
    Envoyer JSON au client

SI ERREUR
    Envoyer erreur en JSON avec code HTTP 500

============================================================================ */
