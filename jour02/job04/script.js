function addToTextarea(event) {
  // Étape 1 : Récupérer la touche pressée
  const key = event.key;

  // Étape 2 : Vérifier si c'est une lettre (a-z ou A-Z)
  const isLetter = /^[a-zA-Z]$/.test(key);

  if (isLetter) {
    // Étape 3 : Récupérer le textarea
    const textareaElement = document.getElementById("keylogger");

    // Étape 4 : Vérifier si le textarea a le focus
    const hasFocus = document.activeElement === textareaElement;

    if (hasFocus) {
      // Étape 5a : Ajouter la lettre 2 fois
      textareaElement.value += key + key;
    } else {
      // Étape 5b : Ajouter la lettre 1 fois
      textareaElement.value += key;
    }
  }
}

// Étape 6 : Écouter toutes les touches du clavier sur toute la page
document.addEventListener("keydown", addToTextarea);

/* FONCTION addToTextarea AVEC paramètre event
    Récupérer touche pressée
    
    SI touche est une lettre (a-z)
        Récupérer textarea
        
        SI textarea a le focus
            Ajouter lettre 2 fois
        SINON
            Ajouter lettre 1 fois
    FIN SI
FIN FONCTION

Écouter touches clavier sur document → exécuter addToTextarea */
