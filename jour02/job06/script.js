const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let userInput = [];

function checkKonami(event) {
  const key = event.key;

  userInput.push(key);

  if (userInput.length > 10) {
    userInput.shift();
  }

  // CORRECTION : Vérifier d'abord que le tableau a exactement 10 éléments
  if (userInput.length === 10) {
    // Ensuite vérifier si tous les éléments correspondent
    const isKonamiComplete = userInput.every((key, index) => {
      return key === konamiCode[index];
    });

    if (isKonamiComplete) {
      document.body.classList.add("konami");
      console.log("Code Konami Plateforme activé !");
    }
  }
}

document.addEventListener("keydown", checkKonami);

/* 
FONCTION checkKonami AVEC paramètre event
    Récupérer touche pressée
    Ajouter touche au tableau utilisateur
    
    SI tableau trop long (> 10)
        Supprimer première touche
    FIN SI
    
    SI tableau a exactement 10 éléments
        SI séquence utilisateur = code Konami
            Ajouter classe "konami" au body
        FIN SI
    FIN SI
FIN FONCTION

Au keydown → exécuter checkKonami
*/
