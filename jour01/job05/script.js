function showDaysWeeks() {
  let daysWeeks = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  for (let index = 0; index < daysWeeks.length; index++) {
    console.log(daysWeeks[index]);
  }
}

showDaysWeeks();

/* FONCTION showDaysWeeks SANS paramètre
    CRÉER tableau daysWeeks contenant ["Lundi", "Mardi", ..., "Dimanche"]
    
    POUR chaque position index de 0 à 6
        AFFICHER daysWeeks[index]
    FIN POUR
FIN FONCTION */
