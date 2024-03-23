import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 79vh;
`;

const Logo = styled.img`
  width: 200px; /* Définissez la largeur de votre logo */
`;

// Component
const Homepage = () => {
  return (
    <Container>
      <Logo src="/Leaflogo.png" alt="Logo Leaf AI" />
    </Container>
  );
};

export default Homepage;