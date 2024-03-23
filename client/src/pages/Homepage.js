import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 79vh;
  text-align: center;
`;

const Logo = styled.img`
  width: 400px; /* Définissez la largeur de votre logo */
  margin-bottom: 20px; /* Espacement entre le logo et le texte */
`;

const Title = styled.h1`
  font-size: 3em;
  color: #333; /* Couleur du texte */
  margin-bottom: 20px; /* Espacement après le titre */
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #666; /* Couleur du texte */
`;

// Component
const Homepage = () => {
  return (
    <Container>
      <Logo src="/Leaflogo.png" alt="Logo Leaf AI" />
      <Title>Bienvenue sur Leaf AI</Title>
      <Description>
        Leaf AI est votre solution innovante pour la détection précoce des maladies fongiques sur les plantes. Explorez nos fonctionnalités et découvrez comment nous pouvons aider à améliorer la santé de vos cultures.
      </Description>
    </Container>
  );
};

export default Homepage;
