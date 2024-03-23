import { useState } from 'react';
import { Button } from '@nextui-org/react';
// import { auth } from './firebase';
import {Link} from 'react-router-dom';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion de l'utilisateur

  // Fonction de connexion
  // const signIn = (email, password) => {
  // return auth.signInWithEmailAndPassword(email, password);
// };

// Fonction de déconnexion
  // const signOut = () => {
  // return auth.signOut();
// };

// Fonction de vérification de l'état de l'authentification
  // const checkAuthState = (callback) => {
//   return auth.onAuthStateChanged(callback);
// };
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
    <div style={{
      backgroundColor: 'black', 
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
  );
};

export default Header;