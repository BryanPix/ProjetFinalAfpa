// on call le package express
const express = require('express');

const {
    createCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
} = require('../controllers/calendarController');

const requireAuth = require('../middleware/requireAuth');


// on associe le router express a une constante router
const router = express.Router();

// Permet de proteger les routes en dessous  car pour le CRUD il faut pouvoir s'identifier
router.use(requireAuth);

//on attache la constante router a un handler
// Ajout d'une tâche dans le calendrier
router.post('/', createCalendar);

// Récuperation d'une tâche dans le calendrier
router.get('/', getCalendar);

// Mise à jour d'une tâche dans le calendrier
router.patch('/:id', updateCalendar);

// Suppression d'une tâche dans le calendrier
router.delete('/:id', deleteCalendar);


module.exports = router;