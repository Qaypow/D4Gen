import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importer Link depuis react-router-dom

const Container = styled.div`
  padding: 20px;
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled.li`
  display: inline;
  margin-right: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion de l'utilisateur

  // Fonction de gestion de la connexion
  const handleLogin = () => {
    // Logique de connexion ici (par exemple, appel à une fonction d'authentification)
    // Après la connexion réussie, mettez à jour l'état de connexion
    setIsLoggedIn(true);
  };

  // Fonction de gestion de la déconnexion
  const handleLogout = () => {
    // Logique de déconnexion ici
    // Après la déconnexion réussie, mettez à jour l'état de connexion
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div style={{
        backgroundColor: '#006400', 
        padding: '10px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        {/* Logo on the left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* If logo.png is in the public folder */}
          <img src="Leaflogo.png" alt="logo" style={{ width: '50px', marginRight: '10px' }} />
          
          <h1 style={{ color: 'white', fontSize: '1.5em', margin: 0 }}>
            Leaf AI
          </h1>
        </div>
        
        {/* Condition pour afficher le bouton de connexion ou de déconnexion */}
        {isLoggedIn ? (
          <Button auto flat color="error" onClick={handleLogout}>
            Déconnexion
          </Button>
        ) : (
          <Button auto flat color="success" onClick={handleLogin}>
            Connexion 
          </Button>
        )}
      </div>
      <Container>
        <NavigationList>
          <NavigationItem>
            <StyledLink to="/">Accueil</StyledLink>
          </NavigationItem>
          <NavigationItem>
            <StyledLink to="/SubmitPhotos">Analyser une photo</StyledLink>
          </NavigationItem>
          <NavigationItem>
            <StyledLink to="/contact">Contact</StyledLink>
          </NavigationItem>
        </NavigationList>
      </Container>
    </div>
  );
};

export default Header;
