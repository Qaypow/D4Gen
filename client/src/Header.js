import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

// Ajout de la police de caractères à la propriété font-family
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif; /* Utilisation de la police Montserrat */
  transition: color 0.3s ease;
  padding: 10px;

  &:hover {
    color: #007bff;
  }
`;

const HeaderContainer = styled.div`
  background-color: #006400;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  color: white;
  font-family: 'Bookman', 'URW Bookman L', serif;
  font-size: 1.5em;
  margin: 0;
  font-family: 'Roboto', sans-serif;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <HeaderContainer>
        <LogoContainer>
          <img src="Leaflogo.png" alt="logo" style={{ width: '50px', marginRight: '10px' }} />
          <LogoText>Leaf AI</LogoText>
        </LogoContainer>
        {isLoggedIn ? (
          <StyledButton auto flat color="error" onClick={handleLogout}>
            Déconnexion
          </StyledButton>
        ) : (
          <StyledButton auto flat color="success" onClick={handleLogin}>
            Connexion
          </StyledButton>
        )}
      </HeaderContainer>
      <Container>
        <NavigationList>
          <StyledLink to="/">Accueil</StyledLink>
          <StyledLink to="/SubmitPhotos">Analyser une photo</StyledLink>
          <StyledLink to="/OurContacts">Nous contacter</StyledLink>
        </NavigationList>
      </Container>
    </div>
  );
};

export default Header;

