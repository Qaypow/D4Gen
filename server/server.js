const express = require('express');
const mysql = require('mysql2');
const config = require('./config');

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour les logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

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

// Définir une route POST pour ajouter une ligne à la base de données
app.post('/api/addData', (req, res) => {
    const { data } = req.body; // Supposons que vous recevez les données à ajouter dans le corps de la requête POST
    // Insérer une nouvelle ligne dans la base de données
    connection.query('INSERT INTO ma_table (colonne) VALUES (?)', [data], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données dans la base de données : ', err);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
            return;
        }
        console.log('Données insérées avec succès dans la base de données.');
        res.json({ message: 'Données insérées avec succès dans la base de données.' });
    });
});

// Écouter les requêtes sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});