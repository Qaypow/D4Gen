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
    if (req.file) {
        let result = '';

        // Assurez-vous que le chemin vers python.exe et le script Python sont corrects
        const pythonProcess = spawn('C:/Users/pierre/anaconda3/envs/d4gen/python.exe', ['ml_model/plant_disease_prediction.py', req.file.path]);

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Erreur du script Python : ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Processus Python terminé avec le code ${code}`);
            if (code === 0) {
                console.log("Résultat de la prédiction :", result); // Afficher la prédiction dans la console
                try {
                    const parsedResult = JSON.parse(result); // Assurez-vous que la sortie est au format JSON
                    res.json(parsedResult);
                } catch (error) {
                    res.status(500).json({ error: "Erreur lors de l'analyse du résultat de la prédiction." });
                }
            } else {
                res.status(500).json({ error: 'Une erreur est survenue lors de la prédiction.' });
            }
        });
    } else {
        res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});