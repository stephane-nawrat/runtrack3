function bissextile(annee) {
  if (annee % 400 === 0) {
    return true;
  } else if (annee % 100 === 0) {
    return false;
  } else if (annee % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

/* FONCTION bissextile AVEC paramètre année
    SI année divisible par 400 (reste = 0)
        RENVOYER vrai
    SINON SI année divisible par 100
        RENVOYER faux
    SINON SI année divisible par 4
        RENVOYER vrai
    SINON
        RENVOYER faux
FIN FONCTION */

// test
console.log(bissextile(2028));
console.log(bissextile(1900));
console.log(bissextile(2000));
