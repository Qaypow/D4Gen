import React, { useState } from 'react';

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
      // Envoi de la photo au serveur pour analyse
      // Remplacez cette partie par votre propre logique d'envoi de fichiers
      const formData = new FormData();
      formData.append('photo', selectedFile);

      // Exemple d'utilisation de fetch pour envoyer la photo à un endpoint sur le serveur
      const response = await fetch('/upload-photo', {
        method: 'POST',
        body: formData,
      });

      // Traiter la réponse du serveur
      const data = await response.json();
      console.log(data); // Afficher la réponse du serveur (par exemple, les résultats de l'analyse)
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la photo :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '79vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Submit Photos</h1>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <div>
            <h2>Photo sélectionnée :</h2>
            <img src={URL.createObjectURL(selectedFile)} alt="Photo sélectionnée" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
        <button onClick={handleSubmit} disabled={!selectedFile || isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Envoyer la photo'}
        </button>
      </div>
    </div>
  );
};

export default SubmitPhotos;
