/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,php}", // Pour tout le contenu dans le dossier src
    "./jour08/**/*.{html,js,php}", // Ajout de jour08 et tous ses sous-dossiers
    // Si vous avez d'autres dossiers à inclure, ajoutez-les de la même manière
  ],
  theme: {
    extend: {
      fontFamily: {
        monospace: ["Menlo", "monospace"],
      },
      // Ajoutez d'autres extensions de thème si nécessaire
    },
  },
  plugins: [],
};
