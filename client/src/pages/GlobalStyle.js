// GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif; /* Remplacez 'Arial' par la police de votre choix */
    font-size: 16px; /* Taille de la police par défaut */
    color: #333; /* Couleur du texte par défaut */
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bookman', 'URW Bookman L', serif; /* Police pour les titres */
    color: #333; /* Couleur des titres */
    margin-top: 0; /* Supprime les marges par défaut des titres */
    margin-bottom: 20px; /* Ajoute une marge en bas des titres */
  }

  p {
    margin-top: 0; /* Supprime les marges par défaut des paragraphes */
    margin-bottom: 20px; /* Ajoute une marge en bas des paragraphes */
  }
`;

export default GlobalStyles;
