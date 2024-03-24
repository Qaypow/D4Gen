import React, { useState } from 'react';
import './SubmitPhotos.css';

const SubmitPhotos = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Veuillez sélectionner une photo.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response = await fetch('/upload-photo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la photo :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '79vh' }}>
      <div className="info-container">
        <h1>Pourquoi utiliser notre solution ?</h1>
        <p>
          Les maladies fongiques peuvent menacer la productivité agricole. Détecter les maladies dès leur apparition en soumettant une photo de feuille de plante.
        </p>
      </div>
      {selectedFile && (
        <div>
          <h3>Photo sélectionnée :</h3>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Photo sélectionnée"
            style={{ maxWidth: '100%', height: 'auto', minHeight: '35vh', maxHeight: '35vh' }}
          />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' }}>
        <label htmlFor="fileInput" className="bn31" style={{marginRight: '20px'}}>
          <span className="bn31span">Choisir une photo</span>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
        <button className="bn31" onClick={handleSubmit} disabled={!selectedFile || isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer la photo'}
        </button>
      </div>
    </div>
  );
};

export default SubmitPhotos;

