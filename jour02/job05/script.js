function changeFooterColor() {
  // Étape 1 : Récupérer les valeurs de scroll
  const scrollY = window.scrollY; // Position actuelle du scroll
  const scrollHeight = document.body.scrollHeight; // Hauteur totale du document
  const clientHeight = window.innerHeight; // Hauteur de la fenêtre visible

  // Étape 2 : Calculer la hauteur scrollable
  const scrollable = scrollHeight - clientHeight;

  // Étape 3 : Calculer le pourcentage de scroll (0 à 100)
  const scrollPercentage = (scrollY / scrollable) * 100;

  // Étape 4 : Créer une couleur basée sur le pourcentage
  // Du rouge (0%) au vert (100%) via teinte HSL
  const hue = (scrollPercentage / 100) * 120; // 0 = rouge, 120 = vert
  const color = `hsl(${hue}, 100%, 50%)`;

  // Étape 5 : Récupérer le footer et appliquer la couleur
  const footerElement = document.getElementById("footer");
  footerElement.style.backgroundColor = color;
}

// Étape 6 : Écouter l'événement scroll
window.addEventListener("scroll", changeFooterColor);

// Étape 7 : Initialiser la couleur au chargement
changeFooterColor();

/*
FONCTION updateFooterColor
    Récupérer position actuelle du scroll
    Récupérer hauteur totale de la page
    Récupérer hauteur visible de la fenêtre
    
    Calculer hauteur scrollable (totale - visible)
    Calculer pourcentage de scroll (position / scrollable * 100)
    
    Créer une couleur basée sur le pourcentage
    Appliquer la couleur au footer
FIN FONCTION

Au scroll de la page → exécuter updateFooterColor
Au chargement de la page → exécuter updateFooterColor (pour initialiser)
*/
