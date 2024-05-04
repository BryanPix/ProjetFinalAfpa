// Permet de securiser le port de l'application afin d'éviter l'accés à une eventuelle base de données par le client (sert à donner à process.env les clés et valeurs definies dans le fichier .env)
require('dotenv').config();

// Permet d'importer les libraries express et mongoose et de les assigner à des constantes nommées express et mongoose

const express = require('express');
const mongoose = require('mongoose');


// Permet le Cross-origin ressource sharing (permet d'acceder à des ressources se trouvant sur un autre domaine que le serveur de la page web)
const cors = require('cors');

// Permet d'importer le fichier js principale de l'application pour le manipuler a partir de server.js
const userRoutes = require('./routes/user');
const toDoRoutes = require('./routes/todolist');
const calendarRoutes = require('./routes/calendar');


// permet de créer une instance d'express que l'on à importé et l'assigner à une constante nommée app (lorsque l'on importe la librarie express, on importe une fonction par defaut, d'où les parenthèses)

const app = express();


// middleware = nom donnée au code qui s'execute entre la requéte au serveur et la réponse de celui-ci (req, res) il faut mettre "next" après pour que le prochain middleware s'execute

// Middleware permettant de formater les requetes au format JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
// Permet le cross-origin ressource sharing
app.use(cors());
 
app.get('/products/:id', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})



// routes (requete et réponses du serveur en fonction de la requete invoqué, lorsque l'utilisateur visite un URL spécifique, la route correspondante est déclenché et la réponse correspondante s'execute)
// Permet d'utiliser(use) TOUTES les routes associées à la constante  dans l'url
app.use('/api/user', userRoutes)
app.use('/api/toDoList', toDoRoutes)
app.use('/api/calendar', calendarRoutes)

// connection a la bdd avec les clés se trouvant dans .env pour plus de securité et d'organisation
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Permet d'écouter les requetes (listen)
        app.listen(process.env.PORT, () => { 
            console.log('Connecté à la base de données sur le port', process.env.PORT); // Permet d'executer ou (process) la valeur de PORT se trouvant dans le fichier .env pour des raisons de sécurités et aussi d'organisation(un changement de valeur de PORT dans le fichier .env changera pour toutes les valeurs de PORT dans les requetes)
        })
    })
    .catch((error) => {
        console.log(error);
    })

