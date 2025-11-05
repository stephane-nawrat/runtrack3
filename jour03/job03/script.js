// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

// État actuel du puzzle : tableau représentant les 9 cases (0-8)
// Les nombres 1-8 représentent les pièces, 9 représente la case vide
// Exemple : [1,2,3,4,5,6,7,8,9] = état résolu
let puzzleState = [];

// Position de la case vide (index 0-8)
let emptyPosition = 8;

// Le jeu est-il terminé ? (bloque les clics après victoire)
let gameWon = false;

// ============================================================================
// JQUERY : Attendre le chargement du DOM
// ============================================================================
$(function () {
  // Initialiser le puzzle au chargement
  initPuzzle();

  // Événement : clic sur bouton Mélanger
  $("#shuffleButton").on("click", function () {
    shufflePuzzle();
  });

  // Événement : clic sur bouton Recommencer
  $("#restartButton").on("click", function () {
    restartGame();
  });
});

// ============================================================================
// FONCTION : Initialiser le puzzle (état résolu)
// ============================================================================
function initPuzzle() {
  // JAVASCRIPT : Créer l'état initial résolu [1,2,3,4,5,6,7,8,9]
  puzzleState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  emptyPosition = 8; // Case vide en position 8 (dernière case)
  gameWon = false;

  // Afficher le puzzle dans le DOM
  renderPuzzle();
}

// ============================================================================
// FONCTION : Afficher le puzzle dans le DOM
// ============================================================================
function renderPuzzle() {
  // JQUERY : Vider la grille
  $("#puzzle").empty();

  // JAVASCRIPT : Boucle pour créer les 9 cases
  for (let i = 0; i < 9; i++) {
    // Récupérer le numéro de la pièce à cette position
    const pieceNumber = puzzleState[i];

    // JQUERY : Créer un élément <div> avec classe "tile"
    const tile = $("<div></div>").addClass("tile");

    // Stocker l'index de position dans un attribut data
    tile.attr("data-position", i);

    // Si c'est la case vide (9)
    if (pieceNumber === 9) {
      // Ajouter classe "empty" (pas d'image)
      tile.addClass("empty");
    } else {
      // Définir l'image de fond avec le numéro de pièce
      tile.css("background-image", `url('img/${pieceNumber}.PNG')`);

      // JQUERY : Événement click sur cette case
      tile.on("click", function () {
        handleTileClick(i);
      });
    }

    // JQUERY : Ajouter la case à la grille
    $("#puzzle").append(tile);
  }
}

// ============================================================================
// FONCTION : Gérer le clic sur une case
// ============================================================================
function handleTileClick(position) {
  // Si le jeu est gagné, ne rien faire
  if (gameWon) {
    return;
  }

  // Vérifier si la case cliquée est adjacente à la case vide
  if (isAdjacent(position, emptyPosition)) {
    // Échanger la case cliquée avec la case vide
    swapTiles(position, emptyPosition);

    // Mettre à jour la position de la case vide
    emptyPosition = position;

    // Réafficher le puzzle
    renderPuzzle();

    // Vérifier si le joueur a gagné
    if (checkWin()) {
      displayWinMessage();
    }
  }
}

// ============================================================================
// FONCTION : Vérifier si deux cases sont adjacentes (voisines)
// ============================================================================
function isAdjacent(pos1, pos2) {
  // Convertir les positions (index 0-8) en coordonnées (row, col)
  // Exemple : position 4 → row=1, col=1 (centre de la grille)
  const row1 = Math.floor(pos1 / 3); // Ligne (0, 1 ou 2)
  const col1 = pos1 % 3; // Colonne (0, 1 ou 2)

  const row2 = Math.floor(pos2 / 3);
  const col2 = pos2 % 3;

  // Calculer la distance entre les deux cases
  const rowDiff = Math.abs(row1 - row2); // Différence de lignes
  const colDiff = Math.abs(col1 - col2); // Différence de colonnes

  // Deux cases sont adjacentes si :
  // - Même ligne ET colonnes voisines (diff = 1)
  // OU
  // - Même colonne ET lignes voisines (diff = 1)
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// ============================================================================
// FONCTION : Échanger deux cases dans l'état du puzzle
// ============================================================================
function swapTiles(pos1, pos2) {
  // JAVASCRIPT : Destructuring pour échanger les valeurs
  [puzzleState[pos1], puzzleState[pos2]] = [
    puzzleState[pos2],
    puzzleState[pos1],
  ];
}

// ============================================================================
// FONCTION : Mélanger le puzzle (mouvements aléatoires)
// ============================================================================
function shufflePuzzle() {
  // Réinitialiser le jeu
  gameWon = false;
  $("#message").text("");
  $("#restartButton").hide();
  $("#shuffleButton").show();

  // IMPORTANT : On ne peut pas mélanger complètement aléatoirement !
  // Certaines configurations ne sont pas résolvables.
  // Solution : Simuler des mouvements aléatoires valides (100 mouvements)

  for (let i = 0; i < 100; i++) {
    // Trouver toutes les cases adjacentes à la case vide
    const adjacentPositions = [];

    for (let pos = 0; pos < 9; pos++) {
      if (isAdjacent(pos, emptyPosition)) {
        adjacentPositions.push(pos);
      }
    }

    // Choisir une position adjacente aléatoire
    const randomIndex = Math.floor(Math.random() * adjacentPositions.length);
    const randomPosition = adjacentPositions[randomIndex];

    // Déplacer cette pièce (échanger avec la case vide)
    swapTiles(randomPosition, emptyPosition);
    emptyPosition = randomPosition;
  }

  // Réafficher le puzzle mélangé
  renderPuzzle();
}

// ============================================================================
// FONCTION : Vérifier si le joueur a gagné
// ============================================================================
function checkWin() {
  // L'état gagnant est [1,2,3,4,5,6,7,8,9]
  const winState = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // JAVASCRIPT : Comparer chaque élément
  for (let i = 0; i < 9; i++) {
    if (puzzleState[i] !== winState[i]) {
      return false; // Pas encore gagné
    }
  }

  return true; // Gagné !
}

// ============================================================================
// FONCTION : Afficher le message de victoire
// ============================================================================
function displayWinMessage() {
  // Marquer le jeu comme gagné (bloque les clics)
  gameWon = true;

  // JQUERY : Afficher le message avec animation
  $("#message").text("Vous avez gagné ! 🎉").addClass("win");

  // JQUERY : Cacher le bouton Mélanger
  $("#shuffleButton").hide();

  // JQUERY : Afficher le bouton Recommencer
  $("#restartButton").show();
}

// ============================================================================
// FONCTION : Recommencer le jeu
// ============================================================================
function restartGame() {
  // JQUERY : Effacer le message
  $("#message").text("").removeClass("win");

  // JQUERY : Cacher le bouton Recommencer
  $("#restartButton").hide();

  // JQUERY : Afficher le bouton Mélanger
  $("#shuffleButton").show();

  // Réinitialiser le puzzle
  initPuzzle();

  // Mélanger automatiquement
  shufflePuzzle();
}

/*
============================================================================
PSEUDO-CODE GLOBAL

INITIALISATION
    Créer état puzzle = [1,2,3,4,5,6,7,8,9]
    Position vide = 8
    Afficher puzzle

FONCTION renderPuzzle
    Vider grille
    POUR chaque position de 0 à 8
        Créer case
        SI position = case vide
            Ajouter classe "empty"
        SINON
            Définir image de fond
            Ajouter événement click
        Ajouter case à la grille

FONCTION handleTileClick(position)
    SI jeu gagné
        Ne rien faire
    SI position adjacente à case vide
        Échanger case cliquée et case vide
        Mettre à jour position vide
        Réafficher puzzle
        SI victoire
            Afficher message

FONCTION isAdjacent(pos1, pos2)
    Convertir pos1 en (row1, col1)
    Convertir pos2 en (row2, col2)
    SI (même ligne ET colonnes voisines) OU (même colonne ET lignes voisines)
        RETOURNER true
    SINON
        RETOURNER false

FONCTION shufflePuzzle
    POUR 100 fois
        Trouver cases adjacentes à case vide
        Choisir une case aléatoire
        Déplacer cette case
    Réafficher puzzle

FONCTION checkWin
    POUR chaque position
        SI puzzleState[i] ≠ winState[i]
            RETOURNER false
    RETOURNER true
============================================================================ 
*/
