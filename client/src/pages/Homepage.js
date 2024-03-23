import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Link } from 'react-router-dom';
const Homepage = () => {
  return (
      <div>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/about">À propos</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul> 
      </div>
    

  );
};

export default Homepage;