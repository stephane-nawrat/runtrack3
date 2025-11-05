// ============================================================================
// ATTENDRE le chargement du DOM
// ============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le bouton
  const button = document.getElementById("button");

  // Ajouter un événement click sur le bouton
  button.addEventListener("click", loadExpression);
});

// ============================================================================
// FONCTION : Charger l'expression depuis le fichier
// ============================================================================
function loadExpression() {
  // FETCH : Lancer la requête pour récupérer le fichier expression.txt
  // fetch() retourne une PROMISE (promesse)
  fetch("expression.txt")
    // THEN : Quand la réponse arrive du serveur
    .then(function (response) {
      // response = objet contenant la réponse HTTP

      // Vérifier si la requête a réussi (status 200-299)
      if (!response.ok) {
        // Si erreur (404, 500, etc.), lancer une exception
        throw new Error("Erreur lors du chargement du fichier");
      }

      // Extraire le contenu texte de la réponse
      // response.text() retourne aussi une PROMISE
      return response.text();
    })

    // THEN : Quand le texte est extrait
    .then(function (text) {
      // text = contenu du fichier expression.txt

      // Créer un élément <p>
      const paragraph = document.createElement("p");

      // Mettre le texte dans le paragraphe
      paragraph.textContent = text;

      // Récupérer le container
      const container = document.getElementById("container");

      // Vider le container (au cas où il y aurait déjà du contenu)
      container.innerHTML = "";

      // Ajouter le paragraphe au container
      container.appendChild(paragraph);
    })

    // CATCH : Si une erreur se produit à n'importe quelle étape
    .catch(function (error) {
      // Afficher l'erreur dans la console
      console.error("Erreur:", error);

      // Optionnel : Afficher un message d'erreur à l'utilisateur
      const container = document.getElementById("container");
      container.innerHTML =
        "<p style='color: red;'>Erreur lors du chargement de l'expression</p>";
    });
}

/* ============================================================================
PSEUDO-CODE

ATTENDRE chargement DOM
    Récupérer bouton avec id "button"
    Au clic sur bouton → exécuter loadExpression

FONCTION loadExpression
    LANCER fetch("expression.txt")
    
    THEN (quand réponse arrive)
        SI réponse pas OK
            Lancer erreur
        Extraire texte de la réponse
    
    THEN (quand texte extrait)
        Créer paragraphe <p>
        Mettre texte dans paragraphe
        Récupérer container
        Vider container
        Ajouter paragraphe au container
    
    CATCH (si erreur)
        Afficher erreur dans console
        Afficher message erreur à l'utilisateur

============================================================================ */
