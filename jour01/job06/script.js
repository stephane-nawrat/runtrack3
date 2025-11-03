function fizzBuzz() {
  for (let number = 1; number <= 151; number++) {
    if (number % 3 === 0 && number % 15 === 0) {
      console.log("FIZZBUZZ");
    } else if (number % 3 === 0) {
      console.log("FIZZ");
    } else if (number % 5 === 0) {
      console.log("BUZZ");
    } else {
      console.log(number);
    }
  }
}

fizzBuzz();

/* FONCTION fizzBuzz SANS paramètre
    POUR nombre de 1 à 151
        SI nombre divisible par 3 ET par 5
            AFFICHER "FIZZBUZZ"
        SINON SI nombre divisible par 3
            AFFICHER "FIZZ"
        SINON SI nombre divisible par 5
            AFFICHER "BUZZ"
        SINON
            AFFICHER nombre
    FIN POUR
FIN FONCTION */
