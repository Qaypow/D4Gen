import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3em;
  font-family: "Monserrat"; /* Utilisation de font-family au lieu de font */
  color: #333; /* Couleur du texte */
  margin-bottom: 20px; /* Espacement après le titre */
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #666; /* Couleur du texte */
`;

const OurContacts = () => {
  const teamMembers = [
    {
      name: 'Malo de Pastor',
      email: 'malo.depastor@telecom-sudparis.eu',
      phone: '+1234567890',
      photo: '/jean_dupont.jpg', // Chemin vers l'image de Jean Dupont
    },
    {
      name: 'Mehdi Bouzar Dilmi',
      email: 'mehdi.bouzar_dilmi@telecom-sudparis.eu',
      phone: '+0987654321',
      photo: '/marie_durand.jpg', // Chemin vers l'image de Marie Durand
    },
    {
        name: 'Zhejie He',
        email: 'zhejie.he@telecom-sudparis.eu',
        phone: '+0987654321',
        photo: '/marie_durand.jpg', // Chemin vers l'image de Marie Durand
      },
    {
        name: 'Pierre Farret',
        email: 'pierre.farret@telecom-sudparis.eu',
        phone: '+0987654321',
        photo: '/marie_durand.jpg', // Chemin vers l'image de Marie Durand
    },
    {
        name: 'Valentine Dumange',
        email: 'valentine.dumange@telecom-sudparis.eu',
        phone: '+0987654321',
        photo: '/marie_durand.jpg', // Chemin vers l'image de Marie Durand
    },
  ];

  const contactContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '50px',
  };

  const contactStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '400px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    borderRadius: '50%',
    width: '200px',
    height: 'auto',
    marginBottom: '10px',
  };

  const infoStyle = {
    fontSize: '18px',
    margin: '10px 0',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '10px', // Réduit la marge inférieure du titre
  };

  return (

    <div>
      <h1 style={titleStyle}>Nos Contacts</h1>
      <div style={contactContainerStyle}>
        <div>
          {teamMembers.map((member, index) => (
            <div key={index} style={contactStyle}>
              {/* <img src={member.photo} alt={member.name} style={imageStyle} /> */}
              <p style={{ fontWeight: 'bold', fontSize: '24px', margin: '0' }}>{member.name}</p>
              <p style={infoStyle}>Email: {member.email}</p>
              {/* <p style={infoStyle}>Téléphone: {member.phone}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurContacts;
