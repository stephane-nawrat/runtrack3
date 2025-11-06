// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

// Stocker tous les pokémons (chargés depuis le JSON)
let allPokemons = [];

// ============================================================================
// ATTENDRE le chargement du DOM
// ============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Récupérer les éléments du formulaire
  const idInput = document.getElementById("id");
  const nomInput = document.getElementById("nom");
  const typeSelect = document.getElementById("type");
  const sortSelect = document.getElementById("sort");
  const filterButton = document.getElementById("filterButton");
  const resetButton = document.getElementById("resetButton");
  const loadAllButton = document.getElementById("loadAllButton");

  // Événements boutons
  filterButton.addEventListener("click", handleFilter);
  resetButton.addEventListener("click", handleReset);
  loadAllButton.addEventListener("click", loadAllPokemons);

  // AMÉLIORATION 1 : Recherche en temps réel (input)
  idInput.addEventListener("input", handleFilter);
  nomInput.addEventListener("input", handleFilter);
  typeSelect.addEventListener("change", handleFilter);
  sortSelect.addEventListener("change", handleFilter);

  // Charger tous les pokémons au démarrage
  loadAllPokemons();
});

// ============================================================================
// FONCTION : Charger tous les pokémons
// ============================================================================
function loadAllPokemons() {
  fetch("pokemon.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier");
      }
      return response.json();
    })
    .then(function (pokemons) {
      // Stocker dans la variable globale
      allPokemons = pokemons;

      // Appliquer le tri par défaut
      const sortedPokemons = sortPokemons(allPokemons);

      // Afficher tous les pokémons
      displayResults(sortedPokemons);
    })
    .catch(function (error) {
      console.error("Erreur:", error);
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML =
        '<p class="no-results">Erreur lors du chargement des données</p>';
    });
}

// ============================================================================
// FONCTION : Gérer le filtrage
// ============================================================================
function handleFilter() {
  // Si les pokémons ne sont pas encore chargés
  if (allPokemons.length === 0) {
    return;
  }

  // ETAPE 1 : Récupérer les valeurs du formulaire
  const idFilter = document.getElementById("id").value.trim();
  const nomFilter = document.getElementById("nom").value.trim().toLowerCase();
  const typeFilter = document.getElementById("type").value;

  // ETAPE 2 : Filtrer les pokémons
  let filtered = allPokemons;

  // Filtrer par ID (si rempli)
  if (idFilter !== "") {
    filtered = filtered.filter(function (pokemon) {
      return pokemon.id === parseInt(idFilter);
    });
  }

  // Filtrer par Nom (si rempli)
  if (nomFilter !== "") {
    filtered = filtered.filter(function (pokemon) {
      // Recherche partielle dans le nom anglais (insensible à la casse)
      return pokemon.name.english.toLowerCase().includes(nomFilter);
    });
  }

  // Filtrer par Type (si sélectionné)
  if (typeFilter !== "") {
    filtered = filtered.filter(function (pokemon) {
      // Vérifier si le pokémon a ce type
      return pokemon.type.includes(typeFilter);
    });
  }

  // AMÉLIORATION 3 : Trier les résultats
  const sorted = sortPokemons(filtered);

  // ETAPE 3 : Afficher les résultats
  displayResults(sorted);
}

// ============================================================================
// AMÉLIORATION 3 : Fonction de tri
// ============================================================================
function sortPokemons(pokemons) {
  // Récupérer l'option de tri sélectionnée
  const sortOption = document.getElementById("sort").value;

  // Créer une copie du tableau pour ne pas modifier l'original
  const sorted = [...pokemons];

  // Appliquer le tri selon l'option
  switch (sortOption) {
    case "id-asc":
      // Tri par ID croissant (par défaut)
      sorted.sort(function (a, b) {
        return a.id - b.id;
      });
      break;

    case "id-desc":
      // Tri par ID décroissant
      sorted.sort(function (a, b) {
        return b.id - a.id;
      });
      break;

    case "name-asc":
      // Tri par nom A-Z
      sorted.sort(function (a, b) {
        return a.name.english.localeCompare(b.name.english);
      });
      break;

    case "name-desc":
      // Tri par nom Z-A
      sorted.sort(function (a, b) {
        return b.name.english.localeCompare(a.name.english);
      });
      break;

    case "hp-desc":
      // Tri par HP décroissant (plus fort en premier)
      sorted.sort(function (a, b) {
        return b.base.HP - a.base.HP;
      });
      break;

    case "attack-desc":
      // Tri par Attaque décroissant
      sorted.sort(function (a, b) {
        return b.base.Attack - a.base.Attack;
      });
      break;
  }

  return sorted;
}

// ============================================================================
// FONCTION : Afficher les résultats
// ============================================================================
function displayResults(pokemons) {
  const resultsDiv = document.getElementById("results");
  const counterDiv = document.getElementById("counter");

  // AMÉLIORATION 2 : Afficher le compteur
  if (pokemons.length === 0) {
    counterDiv.innerHTML = "Aucun Pokémon trouvé";
    counterDiv.className = "empty";
    resultsDiv.innerHTML =
      '<p class="no-results">Aucun Pokémon ne correspond aux critères</p>';
    return;
  } else if (pokemons.length === allPokemons.length) {
    counterDiv.innerHTML = `Tous les Pokémon (${pokemons.length})`;
    counterDiv.className = "";
  } else {
    counterDiv.innerHTML = `${pokemons.length} Pokémon trouvé${
      pokemons.length > 1 ? "s" : ""
    }`;
    counterDiv.className = "";
  }

  // Créer le HTML pour afficher les pokémons
  let html = '<div class="pokemon-grid">';

  pokemons.forEach(function (pokemon) {
    // Créer les badges de type
    let typesHTML = "";
    pokemon.type.forEach(function (type) {
      typesHTML += `<span class="pokemon-type type-${type.toLowerCase()}">${type}</span>`;
    });

    // Créer les stats
    const statsHTML = `
            <div class="pokemon-stats">
                HP: ${pokemon.base.HP} | 
                ATK: ${pokemon.base.Attack} | 
                DEF: ${pokemon.base.Defense} | 
                SPD: ${pokemon.base.Speed}
            </div>
        `;

    // Créer la carte pokémon
    html += `
            <div class="pokemon-card">
                <div class="pokemon-id">#${pokemon.id}</div>
                <div class="pokemon-name">${pokemon.name.english}</div>
                <div class="pokemon-types">${typesHTML}</div>
                ${statsHTML}
            </div>
        `;
  });

  html += "</div>";

  // Afficher dans la page
  resultsDiv.innerHTML = html;
}

// ============================================================================
// FONCTION : Réinitialiser le formulaire
// ============================================================================
function handleReset() {
  // Vider tous les champs
  document.getElementById("id").value = "";
  document.getElementById("nom").value = "";
  document.getElementById("type").value = "";
  document.getElementById("sort").value = "id-asc";

  // Recharger tous les pokémons
  loadAllPokemons();
}

/* ============================================================================
PSEUDO-CODE

ATTENDRE chargement DOM
    Récupérer tous les éléments du formulaire
    Attacher événements click aux boutons
    Attacher événements input/change pour filtrage temps réel
    Charger tous les pokémons au démarrage

FONCTION loadAllPokemons
    LANCER fetch("pokemon.json")
    THEN
        Stocker dans variable globale allPokemons
        Trier par défaut
        Afficher tous
    CATCH
        Afficher erreur

FONCTION handleFilter
    SI pokémons pas chargés
        Arrêter
    
    Récupérer valeurs formulaire (id, nom, type)
    
    Commencer avec tous les pokémons
    Filtrer par ID (si rempli)
    Filtrer par Nom (si rempli)
    Filtrer par Type (si sélectionné)
    
    Trier résultats
    Afficher résultats

    FONCTION sortPokemons AVEC paramètre pokemons
    Récupérer option de tri
    Créer copie du tableau
    
    SELON option
        "id-asc" → Trier par ID croissant
        "id-desc" → Trier par ID décroissant
        "name-asc" → Trier par nom A-Z
        "name-desc" → Trier par nom Z-A
        "hp-desc" → Trier par HP décroissant
        "attack-desc" → Trier par Attaque décroissant
    
    Retourner tableau trié

FONCTION displayResults AVEC paramètre pokemons
    Afficher compteur de résultats
    
    SI aucun pokémon
        Afficher "Aucun résultat"
    SINON
        Afficher nombre de pokémons trouvés
        POUR chaque pokémon
            Créer HTML de la carte
            Ajouter types avec couleurs
            Ajouter stats
        Afficher dans la page

FONCTION handleReset
    Vider tous les champs
    Réinitialiser tri par défaut
    Recharger tous les pokémons

============================================================================ */
