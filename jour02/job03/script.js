function addone() {
  // Étape 1 : Récupérer l'élément paragraphe
  const counterElement = document.getElementById("compteur");

  // Étape 2 : Lire le contenu texte actuel (c'est une chaîne de caractères)
  const currentText = counterElement.textContent;

  // Étape 3 : Convertir le texte en nombre
  const currentNumber = parseInt(currentText);

  // Étape 4 : Ajouter 1 au nombre
  const newNumber = currentNumber++;

  // Étape 5 : Remettre le nouveau nombre dans le paragraphe
  counterElement.textContent = newNumber;
}

// Étape 6 : Récupérer le bouton
const buttonElement = document.getElementById("button");

// Étape 7 : Écouter le clic sur le bouton
buttonElement.addEventListener("click", addone);

/* FONCTION addone
    Récupérer élément "compteur"
    Lire son contenu (texte)
    Convertir texte en nombre
    incrementation++ (Ajouter 1)
    Remettre dans le paragraphe
FIN FONCTION

Au clic sur bouton → exécuter addone */
