$(function () {
  const quoteText =
    "Les logiciels et les cathédrales, c'est un peu la même chose - d'abord on les construit, ensuite on prie.";
  const quoteParagraph = $("<p id='quote'>" + quoteText + "</p>");

  $("#quoteContainer").append(quoteParagraph);
  $("#quote").hide();

  // AVANT (déprécié) : .click(function() { })
  // APRÈS (moderne) : .on("click", function() { })

  $("#toggleButton").on("click", function () {
    // Utiliser .on() au lieu de .click()

    if ($("#quote").is(":visible")) {
      $("#quote").hide();
      $("#toggleButton").text("Afficher la citation");
    } else {
      $("#quote").show();
      $("#toggleButton").text("Cacher la citation");
    }
  });
});

/* 
ATTENDRE chargement du document
    Créer citation (une seule fois)
    Ajouter citation au container (cachée)
    
    AU CLIC sur bouton
        SI citation visible
            Cacher citation
            Changer texte bouton en "Afficher"
        SINON
            Afficher citation
            Changer texte bouton en "Cacher"
    FIN
*/
