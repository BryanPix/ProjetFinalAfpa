// on call le package express
const express = require('express');

const {
    createCalendar,
    getCalendars,
    updateCalendar,
    deleteCalendar
} = require('../controllers/calendarController');

// on associe le router express a une constante router
const router = express.Router();

//on attache la constante router a un handler
// Ajout d'une tâche dans le calendrier
router.post('/', createCalendar);

// Récuperation de toutes les tâches dans le calendrier
router.get('/', getCalendars);

// Mise à jour d'une tâche dans le calendrier
router.patch('/:id', updateCalendar);

// Suppression d'une tâche dans le calendrier
router.delete('/:id', deleteCalendar);


module.exports = router;