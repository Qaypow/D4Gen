// const mysql = require('mysql2');
// const config = require('./config');
// const express = require('express');
//
// const app = express();
// const port = 3000;
//
// const connection = mysql.createConnection({
//     ...config,
//     authPlugins: {
//         mysql_clear_password: () => () => Buffer.from(config.password + '\0')
//     }
// });
//
// connection.connect((err) => {
//     if (err) {
//         console.error('Erreur de connexion à la base de données : ', err);
//         return;
//     }
//     console.log('Connexion à la base de données MySQL établie.');
// });
//
// // Middleware pour parser le JSON
// app.use(express.json());
//
// // Middleware pour les logs
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });
//
// // Définir les routes de votre API
// app.get('/api/endpoint', (req, res) => {
//     // Logique pour gérer la requête
//     res.json({ message: 'Réponse de l\'API' });
// });
//
// // Écouter les requêtes sur le port spécifié
// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });



const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const { spawn } = require('child_process');
const cors = require('cors');

// Configurez Multer pour utiliser le nom de fichier original
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Générez un nom de fichier unique ici si nécessaire
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());

app.post('/upload-photo', upload.single('photo'), (req, res) => {
    console.log("Photo reçue, traitement en cours...");
    console.log(req.body); // Afficher les autres parties du corps de la requête
    console.log(req.file); // Cela montrera le chemin du fichier sauvegardé avec l'extension correcte
    if (req.file) {
        // Exécuter le script Python et envoyer la photo comme argument
        const pythonProcess = spawn('C:/Users/pierre/anaconda3/envs/d4gen', ['ml_model/plant_disease_prediction.py', req.file.path]);

        pythonProcess.stdout.on('data', (data) => {
            // Récupérer la sortie du script Python
            console.log(`Sortie du script Python : ${data}`);
            // Envoyer la réponse au client
            res.json({ result: data.toString() });
        });

        pythonProcess.stderr.on('data', (data) => {
            // En cas d'erreur
            console.error(`Erreur du script Python : ${data}`);
            res.status(500).json({ error: data.toString() });
        });

        pythonProcess.on('close', (code) => {
            console.log(`Processus Python terminé avec le code ${code}`);
        });
    } else {
        res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});