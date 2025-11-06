// ============================================================================
// ATTENDRE le chargement du DOM
// ============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le bouton Update
  const updateButton = document.getElementById("updateButton");

  // Événement : au clic, lancer la requête AJAX
  updateButton.addEventListener("click", fetchUsers);

  // Charger les utilisateurs au démarrage (optionnel)
  fetchUsers();
});

// ============================================================================
// FONCTION PRINCIPALE : Récupérer les utilisateurs (AJAX)
// ============================================================================
function fetchUsers() {
  // ÉTAPE 1 : Afficher le message de chargement
  showLoading(true);
  hideError();

  // ÉTAPE 2 : LANCER LA REQUÊTE AJAX avec Fetch API
  // fetch() = fonction JavaScript pour faire des requêtes HTTP
  // C'est ASYNCHRONE : le code continue pendant que la requête est en cours
  fetch("users.php")
    // ====================================================================
    // THEN 1 : Quand la réponse HTTP arrive du serveur
    // ====================================================================
    .then(function (response) {
      // response = objet Response contenant la réponse HTTP
      // response.ok = true si status 200-299
      // response.status = code HTTP (200, 404, 500, etc.)

      console.log("Réponse reçue, status:", response.status);

      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      // Extraire le JSON de la réponse
      // response.json() retourne aussi une Promise (asynchrone)
      return response.json();
    })

    // ====================================================================
    // THEN 2 : Quand le JSON est extrait et parsé
    // ====================================================================
    .then(function (users) {
      // users = tableau JavaScript contenant les utilisateurs
      // Exemple : [{id: 1, nom: "Dupont", ...}, {id: 2, ...}]

      console.log("Données reçues:", users);

      // Cacher le message de chargement
      showLoading(false);

      // Afficher les utilisateurs dans le tableau HTML
      displayUsers(users);
    })

    // ====================================================================
    // CATCH : Si une erreur se produit à n'importe quelle étape
    // ====================================================================
    .catch(function (error) {
      // Erreur possible : réseau, serveur, JSON invalide, etc.

      console.error("Erreur AJAX:", error);

      // Cacher le message de chargement
      showLoading(false);

      // Afficher le message d'erreur
      showError(
        "Erreur lors de la récupération des données : " + error.message
      );
    });

  // ========================================================================
  // IMPORTANT : Cette ligne s'exécute IMMÉDIATEMENT
  // (avant même que la réponse arrive du serveur)
  // ========================================================================
  console.log("Requête envoyée, en attente de la réponse...");
}

// ============================================================================
// FONCTION : Afficher les utilisateurs dans le tableau HTML
// ============================================================================
function displayUsers(users) {
  // Récupérer le tbody du tableau
  const tbody = document.getElementById("usersTableBody");

  // Vider le tbody (supprimer les anciennes lignes)
  tbody.innerHTML = "";

  // Vérifier si des utilisateurs existent
  if (users.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="4" style="text-align: center;">Aucun utilisateur trouvé</td></tr>';
    updateUserCount(0);
    return;
  }

  // Boucler sur chaque utilisateur
  users.forEach(function (user) {
    // Créer une nouvelle ligne <tr>
    const row = document.createElement("tr");

    // Créer les cellules <td> avec les données
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nom}</td>
            <td>${user.prenom}</td>
            <td>${user.email}</td>
        `;

    // Ajouter la ligne au tbody
    tbody.appendChild(row);
  });

  // Mettre à jour le compteur
  updateUserCount(users.length);
}

// ============================================================================
// FONCTION : Afficher/Cacher le message de chargement
// ============================================================================
function showLoading(show) {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = show ? "block" : "none";
}

// ============================================================================
// FONCTION : Afficher un message d'erreur
// ============================================================================
function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

// ============================================================================
// FONCTION : Cacher le message d'erreur
// ============================================================================
function hideError() {
  const errorDiv = document.getElementById("error");
  errorDiv.style.display = "none";
}

// ============================================================================
// FONCTION : Mettre à jour le compteur d'utilisateurs
// ============================================================================
function updateUserCount(count) {
  const countDiv = document.getElementById("userCount");
  countDiv.textContent = `${count} utilisateur${count > 1 ? "s" : ""} trouvé${
    count > 1 ? "s" : ""
  }`;
}

/* ============================================================================
PSEUDO-CODE COMPLET

ATTENDRE chargement DOM
    Récupérer bouton Update
    Au clic → exécuter fetchUsers
    Charger utilisateurs au démarrage

FONCTION fetchUsers (AJAX)
    Afficher message "Chargement..."
    Cacher message d'erreur
    
    LANCER fetch("users.php")  ← ASYNCHRONE
    
    THEN (quand réponse HTTP arrive)
        Vérifier si requête OK (status 200-299)
        SI erreur HTTP
            Lancer exception
        Extraire JSON de la réponse
    
    THEN (quand JSON extrait)
        Cacher message "Chargement..."
        Afficher utilisateurs dans tableau
    
    CATCH (si erreur)
        Cacher message "Chargement..."
        Afficher message d'erreur

FONCTION displayUsers AVEC paramètre users
    Récupérer tbody du tableau
    Vider tbody
    
    SI aucun utilisateur
        Afficher "Aucun utilisateur"
    SINON
        POUR chaque utilisateur
            Créer ligne <tr>
            Remplir avec id, nom, prenom, email
            Ajouter au tbody
    
    Mettre à jour compteur

FONCTION showLoading AVEC paramètre show
    SI show = true
        Afficher "Chargement..."
    SINON
        Cacher "Chargement..."

FONCTION showError AVEC paramètre message
    Afficher message d'erreur

FONCTION hideError
    Cacher message d'erreur

FONCTION updateUserCount AVEC paramètre count
    Afficher "X utilisateur(s) trouvé(s)"

============================================================================ */
