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
    <title>Inscription</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <div class="form-wrapper">
            <h1>Créer un compte</h1>

            <form id="registerForm" novalidate>

                <!-- Prénom -->
                <div class="form-group">
                    <label for="prenom">Prénom *</label>
                    <input type="text" id="prenom" name="prenom" required>
                    <span class="error-message" id="error-prenom"></span>
                </div>

                <!-- Nom -->
                <div class="form-group">
                    <label for="nom">Nom *</label>
                    <input type="text" id="nom" name="nom" required>
                    <span class="error-message" id="error-nom"></span>
                </div>

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
                    <small class="hint">Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</small>
                </div>

                <!-- Confirmation mot de passe -->
                <div class="form-group">
                    <label for="confirm_password">Confirmer le mot de passe *</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                    <span class="error-message" id="error-confirm_password"></span>
                </div>

                <!-- Message global -->
                <div id="form-message" class="form-message"></div>

                <!-- Bouton -->
                <button type="submit" class="btn btn-primary" id="submitBtn">
                    S'inscrire
                </button>

            </form>

            <p class="footer-link">
                Vous avez déjà un compte ? <a href="connexion.php">Se connecter</a>
            </p>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // Initialiser la validation du formulaire d'inscription
        initRegisterForm();
    </script>
</body>

</html>