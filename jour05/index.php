<?php
require_once 'config/database.php';

$user = getCurrentUser($pdo);
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Authentification AJAX</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <header>
            <h1>Bienvenue sur notre site</h1>
        </header>

        <main>
            <?php if ($user): ?>
                <!-- Utilisateur connecté -->
                <div class="welcome-message">
                    <h2>Bonjour <?= htmlspecialchars($user['prenom']) ?> !</h2>
                    <p>Vous êtes connecté avec l'email : <?= htmlspecialchars($user['email']) ?></p>
                    <button id="logoutBtn" class="btn btn-danger">Se déconnecter</button>
                </div>
            <?php else: ?>
                <!-- Utilisateur non connecté -->
                <div class="auth-links">
                    <h2>Bienvenue !</h2>
                    <p>Pour accéder à votre espace personnel, veuillez vous connecter ou créer un compte.</p>
                    <div class="buttons">
                        <a href="connexion.php" class="btn btn-primary">Se connecter</a>
                        <a href="inscription.php" class="btn btn-secondary">S'inscrire</a>
                    </div>
                </div>
            <?php endif; ?>
        </main>
    </div>

    <script src="script.js"></script>
    <script>
        // Gestion déconnexion
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                fetch('api/logout.php')
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            window.location.href = 'index.php';
                        }
                    });
            });
        }
    </script>
</body>

</html>