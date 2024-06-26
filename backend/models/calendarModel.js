// On a besoin de la base de donnée
const mongoose = require('mongoose');

// On associe le schema de mongoose à une constante
const Schema = mongoose.Schema;

// On crée un schema de données pour éviter les abus par le client (pour éviter qu'il puisse rentrer n'importe quelle informations sans controle)
const calendarSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('calendar', calendarSchema);
