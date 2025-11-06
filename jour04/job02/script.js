// ============================================================================
// FONCTION : Extraire une valeur d'une chaîne JSON
// ============================================================================
function jsonValueKey(jsonString, key) {
  // ETAPE 1 : Convertir la chaîne JSON en objet JavaScript
  // JSON.parse() transforme du texte en objet
  const jsonObject = JSON.parse(jsonString);

  // ETAPE 2 : Récupérer la valeur associée à la clé
  // Utilisation de la notation bracket pour accéder à la propriété
  // car "key" est une variable (pas un nom de propriété fixe)
  const value = jsonObject[key];

  // ETAPE 3 : Retourner la valeur
  return value;
}

/* PSEUDO-CODE
FONCTION jsonValueKey AVEC paramètres jsonString, key
    Convertir jsonString en objet avec JSON.parse()
    Récupérer valeur avec objet[key]
    Retourner valeur
FIN FONCTION
*/

// ============================================================================
// TESTS DE LA FONCTION
// ============================================================================

// Chaîne JSON de test (format correct)
const jsonString = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}`;

// Test 1 : Récupérer la ville
const city = jsonValueKey(jsonString, "city");
console.log("city:", city); // "Marseille"

// Test 2 : Récupérer le nom
const name = jsonValueKey(jsonString, "name");
console.log("name:", name); // "La Plateforme_"

// Test 3 : Récupérer l'adresse
const address = jsonValueKey(jsonString, "address");
console.log("address:", address); // "8 rue d'hozier"

// Test 4 : Récupérer le nombre de staff
const nbStaff = jsonValueKey(jsonString, "nb_staff");
console.log("nb_staff:", nbStaff); // "11"

// Test 5 : Clé inexistante
const inexistant = jsonValueKey(jsonString, "country");
console.log("country:", inexistant); // undefined

// ============================================================================
// AFFICHAGE DES RÉSULTATS DANS LA PAGE
// ============================================================================
const resultsDiv = document.getElementById("results");

resultsDiv.innerHTML = `
    <h2>Résultats des tests :</h2>
    <p><strong>JSON utilisé :</strong></p>
    <pre>${jsonString}</pre>
    
    <p><strong>Clé "city" :</strong> <code>${city}</code></p>
    <p><strong>Clé "name" :</strong> <code>${name}</code></p>
    <p><strong>Clé "address" :</strong> <code>${address}</code></p>
    <p><strong>Clé "nb_staff" :</strong> <code>${nbStaff}</code></p>
    <p><strong>Clé "country" (inexistante) :</strong> <code>${inexistant}</code></p>
`;
