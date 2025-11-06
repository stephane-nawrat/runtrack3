<?php
require_once 'config/database.php';

// Si déjà connecté, rediriger vers l'accueil
if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <div class="form-wrapper">
            <h1>Se connecter</h1>

            <form id="loginForm" novalidate>

                <!-- Email -->
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error-message" id="error-email"></span>
                </div>

                <!-- Mot de passe -->
                <div class="form-group">
                    <label for="password">Mot de passe *</label>
                    <input type="password" id="password" name="password" required>
                    <span class="error-message" id="error-password"></span>
                </div>

                <!-- Message global -->
                <div id="form-message" class="form-message"></div>

                <!-- Bouton -->
                <button type="submit" class="btn btn-primary" id="submitBtn">
                    Se connecter
                </button>

            </form>

            <p class="footer-link">
                Pas encore de compte ? <a href="inscription.php">S'inscrire</a>
            </p>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // Initialiser la validation du formulaire de connexion
        initLoginForm();
    </script>
</body>

</html>