<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création de Compte</title>
    <!-- Lien vers le fichier CSS compilé -->
    <link rel="stylesheet" href="../../src/output.css">
</head>

<body class="font-[menlo] bg-blue-700">
    <!-- HEADER AVEC NAVIGATION -->
    <!-- HEADER AVEC NAVIGATION -->
    <header class="bg-white shadow-md p-4 flex font-[verdana] justify-between items-center">
        <div class="text-2xl font-bold">tailwind</div>
        <nav class="flex space-x-8">
            <a href="index.php" class="hover:text-blue-700">Accueil</a>
            <a href="index.php" class="hover:text-blue-500">Inscription</a>
            <a href="index.php" class="hover:text-blue-500">Connexion</a>
            <a href="index.php" class="hover:text-blue-500">Rechercher</a>
        </nav>
    </header>

    <!-- SECTION FORMULAIRE -->
    <section class="form-section">
        <h2 class="underline">Créer un compte</h2>
        <form action="create_account.php" method="post">
            <div class="form-group">
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Homme</label>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Femme</label>
                <input type="radio" id="other" name="gender" value="other">
                <label for="other">Autre</label>
            </div>

            <div class="form-group">
                <label for="firstname">Prénom:</label>
                <input type="text" id="firstname" name="firstname" required>
            </div>

            <div class="form-group">
                <label for="lastname">Nom:</label>
                <input type="text" id="lastname" name="lastname" required>
            </div>

            <div class="form-group">
                <label for="address">Adresse:</label>
                <input type="text" id="address" name="address" required>
            </div>

            <div class="form-group">
                <label for="email">Adresse e-mail:</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" name="password" required>
            </div>

            <div class="form-group">
                <label for="confirm_password">Confirmer le mot de passe:</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
            </div>

            <div class="form-group">
                <label for="hobbies">Choisissez vos passions:</label>
                <input type="checkbox" id="sports" name="hobbies[]" value="sports">
                <label for="sports">Sports</label>
                <input type="checkbox" id="music" name="hobbies[]" value="music">
                <label for="music">Musique</label>
                <input type="checkbox" id="computer" name="hobbies[]" value="computer">
                <label for="computer">Informatique</label>
                <input type="checkbox" id="travel" name="hobbies[]" value="travel">
                <label for="travel">Voyages</label>
            </div>

            <button type="submit">Créer le compte</button>
        </form>
    </section>


    <!-- FOOTER -->
    <footer class="bg-black text-sm text-left mt-10">
        <ul class="text-white p-15">
            <li><a href="index.php" class="hover:text-blue-500">Accueil</a></li>
            <li><a href="index.php" class="hover:text-blue-500">Inscription</a></li>
            <li><a href="index.php" class="hover:text-blue-500">Connexion</a></li>
            <li><a href="index.php" class="hover:text-blue-500">Rechercher</a></li>
        </ul>
    </footer>

</body>

</html>