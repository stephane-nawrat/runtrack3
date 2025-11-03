function tri(numbers, order) {
  // Étape 1 : Vérifier l'ordre demandé
  if (order === "asc") {
    // Étape 2a : Trier en ordre ascendant (croissant)
    numbers.sort(function (a, b) {
      return a - b; // Si a < b, résultat négatif → a avant b
    });
  } else if (order === "desc") {
    // Étape 2b : Trier en ordre descendant (décroissant)
    numbers.sort(function (a, b) {
      return b - a; // Si b > a, résultat positif → b avant a
    });
  }

  // Étape 3 : Retourner le tableau trié
  return numbers;
}

// Tests
console.log(tri([5, 2, 8, 1, 9], "asc")); // [1, 2, 5, 8, 9]
console.log(tri([5, 2, 8, 1, 9], "desc")); // [9, 8, 5, 2, 1]
console.log(tri([42, 7, 103, 15], "asc")); // [7, 15, 42, 103]

/* FONCTION tri AVEC paramètres numbers, order
    SI order = "asc"
        Trier numbers en ascendant (a - b)
    SINON SI order = "desc"
        Trier numbers en descendant (b - a)
    FIN SI
    RENVOYER numbers
FIN FONCTION */
