function showHide() {
  // Étape 1 : Vérifier si l'article existe déjà
  const existingArticle = document.getElementById("article");

  if (existingArticle) {
    // Étape 2a : Si l'article existe, le supprimer
    existingArticle.remove();
  } else {
    // Étape 2b : Si l'article n'existe pas, le créer

    // Créer un nouvel élément <article>
    const newArticle = document.createElement("article");

    // Lui donner un id pour pouvoir le retrouver plus tard
    newArticle.id = "article";

    // Ajouter le texte dans l'article
    newArticle.textContent =
      "L'important n'est pas la chute, mais l'atterrissage.";

    // Ajouter l'article à la page (dans le body)
    document.body.appendChild(newArticle);
  }
}

// Étape 3 : Récupérer le bouton
const buttonElement = document.getElementById("button");

// Étape 4 : Écouter le clic sur le bouton
buttonElement.addEventListener("click", showHide);

/* 
FONCTION showhide
    SI article existe dans la page
        Supprimer article
    SINON
        Créer article
        Lui donner id "article"
        Lui ajouter le texte
        L'ajouter au body
    FIN SI
FIN FONCTION

Au clic sur bouton → exécuter showhide
*/
