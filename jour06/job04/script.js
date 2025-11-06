// 📍 Étape 1 : Sélection des éléments du DOM
// On "attrape" les éléments qu'on veut manipuler grâce à leurs classes CSS
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

// 📍 Étape 2 : Gestion du menu hamburger
// On écoute le clic sur le bouton hamburger
hamburger.addEventListener("click", () => {
  // Quand on clique :
  // 1. On ajoute/enlève la classe 'show' sur la liste
  // 2. On ajoute/enlève la classe 'active' sur le bouton (pour l'animation)
  navList.classList.toggle("show");
  hamburger.classList.toggle("active");
});

// 📍 Étape 3 : Affichage dynamique de la résolution
// Fonction qui met à jour l'affichage de la largeur
function updateWidth() {
  document.getElementById("width").textContent = window.innerWidth;
}

// On lance la fonction au chargement de la page
updateWidth();

// On écoute l'événement "resize" (redimensionnement de fenêtre)
// et on relance la fonction à chaque fois
window.addEventListener("resize", updateWidth);
