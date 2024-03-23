const mysql = require('mysql2');
const config = require('./config');
const express = require('express');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    ...config,
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(config.password + '\0')
    }
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        return;
    }
    console.log('Connexion à la base de données MySQL établie.');
});

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour les logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Définir les routes de votre API
app.get('/api/endpoint', (req, res) => {
    // Logique pour gérer la requête
    res.json({ message: 'Réponse de l\'API' });
});

// Écouter les requêtes sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});