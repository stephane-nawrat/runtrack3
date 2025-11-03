function isPrime(number) {
  // Étape 1 : Si number = 1 ou moins, c'est pas premier
  if (number <= 1) {
    return false;
  }

  // Étape 2 : Je teste tous les diviseurs possibles
  for (let divisor = 2; divisor < number; divisor++) {
    // Si je trouve un diviseur qui marche (reste = 0)
    if (number % divisor === 0) {
      return false; // Alors c'est pas premier, je peux arrêter
    }
  }

  // Étape 3 : Si j'ai testé tous les diviseurs et aucun ne marche
  return true; // Alors c'est premier !
}

function sumPrimeNumbers(number1, number2) {
  // Étape 1 : Je vérifie si les deux nombres sont premiers
  if (isPrime(number1) && isPrime(number2)) {
    // Étape 2 : Si oui, je retourne leur somme
    return number1 + number2;
  } else {
    // Étape 3 : Si non, je retourne false
    return false;
  }
}

// Tests
console.log(sumPrimeNumbers(3, 5)); // 8
console.log(sumPrimeNumbers(7, 11)); // 18
console.log(sumPrimeNumbers(4, 7)); // false
console.log(sumPrimeNumbers(1, 2)); // false
console.log(sumPrimeNumbers(100, 28)); // false

/* FONCTION isPrime AVEC paramètre number
    SI number <= 1
        RENVOYER false
    POUR divisor de 2 à number-1
        SI number divisible par divisor
            RENVOYER false
    FIN POUR
    RENVOYER true
FIN FONCTION

FONCTION sumPrimeNumbers AVEC paramètres number1, number2
    SI number1 est premier ET number2 est premier
        RENVOYER number1 + number2
    SINON
        RENVOYER false
FIN FONCTION */
