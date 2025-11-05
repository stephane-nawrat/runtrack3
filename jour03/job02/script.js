$(function () {
  // Rendre le conteneur sortable
  $("#rainbowContainer").sortable({
    cursor: "move",
    stop: function () {
      $("#message").text("").removeClass("win lose");
    },
  });

  // Fonction mélanger
  function shuffleImages() {
    const container = $("#rainbowContainer");
    const images = container.children("img");
    const imagesArray = images.toArray();

    // Algorithme Fisher-Yates
    for (let i = imagesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
    }

    container.empty();
    $(imagesArray).each(function () {
      container.append(this);
    });

    $("#message").text("").removeClass("win lose");
  }

  // Fonction vérifier
  function checkOrder() {
    const currentOrder = [];

    $("#rainbowContainer img").each(function () {
      currentOrder.push($(this).data("position"));
    });

    const correctOrder = [1, 2, 3, 4, 5, 6];
    let isCorrect = true;

    for (let i = 0; i < correctOrder.length; i++) {
      if (currentOrder[i] !== correctOrder[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      $("#message").text("Vous avez gagné").removeClass("lose").addClass("win");
    } else {
      $("#message").text("Vous avez perdu").removeClass("win").addClass("lose");
    }
  }

  // Événements boutons
  $("#shuffleButton").on("click", shuffleImages);
  $("#checkButton").on("click", checkOrder);
});
