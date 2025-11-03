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

//test (affichage console)
showDaysWeeks();

/* FONCTION showdaysweeks SANS paramètre
    CRÉER tableau daysweeks contenant ["Lundi", "Mardi", ..., "Dimanche"]
    
    POUR chaque position initcount de 0 à 6
        AFFICHER daysweeks[initcount]
    FIN POUR
FIN FONCTION */
