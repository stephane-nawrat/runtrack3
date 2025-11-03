function daysWorked(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let dayOfWeek = date.getDay();

  let holidays2020 = [
    "1-1",
    "13-4",
    "1-5",
    "8-5",
    "21-5",
    "1-6",
    "14-7",
    "15-8",
    "1-11",
    "11-11",
    "25-12",
  ];

  let dateString = day + "-" + month;

  if (year === 2020 && holidays2020.includes(dateString)) {
    console.log(`Le ${day} ${month} ${year} est un jour férié`);
  } else if (dayOfWeek === 0 || dayOfWeek === 6) {
    console.log(`Non, ${day} ${month} ${year} est un week-end`);
  } else {
    console.log(`Oui, ${day} ${month} ${year} est un jour travaillé`);
  }
}

// Tests
daysWorked(new Date(2020, 0, 1));
daysWorked(new Date(2020, 6, 14));
daysWorked(new Date(2020, 0, 4));
daysWorked(new Date(2020, 0, 6));

/* FONCTION daysWorked AVEC paramètre date
    EXTRAIRE jour, mois, année de la date
    EXTRAIRE numéro jour de la semaine
    
    SI date est dans la liste des jours fériés 2020
        AFFICHER "Le [jour] [mois] [année] est un jour férié"
    SINON SI jour de la semaine est Samedi OU Dimanche
        AFFICHER "Non, [jour] [mois] [année] est un week-end"
    SINON
        AFFICHER "Oui, [jour] [mois] [année] est un jour travaillé"
FIN FONCTION */
