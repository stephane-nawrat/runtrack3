function citation() {
  // Étape 1 : Récupérer l'élément HTML qui a l'id "citation"
  const articleElement = document.getElementById("citation");

  // Étape 2 : Récupérer le texte contenu dans cet élément
  const text = articleElement.textContent;

  // Étape 3 : Afficher le texte dans la console
  console.log(text);
}

// Étape 4 : Récupérer le bouton
const buttonElement = document.getElementById("button");

// Étape 5 : Écouter le clic sur le bouton et exécuter la fonction citation
buttonElement.addEventListener("click", citation);

/* 
FONCTION citation
    Récupérer élément avec id "citation"
    Récupérer son texte
    Afficher dans console
FIN FONCTION

Au clic sur bouton "button" → exécuter citation dans la console
*/
