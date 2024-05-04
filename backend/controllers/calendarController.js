const Calendar = require('../models/calendarModel');
const mongoose = require('mongoose');


// récuperation de toutes les tâches dans le calendrier
const getCalendars = async (req, res) => {

    const calendars = await Calendar.find({ }).sort({createdAt: -1}) // permet de trouver toutes les tâches du calendrier et de les trier par ancienté du plus recent au plus ancient

    res.status(200).json(calendars);
}

// création d'une tâche dans le calendrier
const createCalendar = async (req, res) => {
    const {title, description} = req.body;

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: `Veuillez remplir tous les champs.`, emptyFields })
    }

    // Ajoute la tâche du calendrier à la base de données
    try{
        const calendars = await Calendar.create({title, description, user_id});
        res.status(200).json(calendars);
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

// Mise à jour d'une tâche du calendrier
const updateCalendar = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `Cette tâche n'existe pas.`});
    }
    
    const calendars = await Calendar.findOneAndUpdate(
        { _id: id }, 
        { ...req.body }, 
        { new: true }
    );

    if (!calendars) {
        res.status(404).json({error: `Cette tâche n'existe pas.`});
    }
    res.status(200).json(calendars);
}


// supprime une tâche du calendrier
const deleteCalendar = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `Cette tâche n'existe pas.`});
    }

    try {
        const calendars = await Calendar.findOneAndDelete({_id: id});
        if (!calendars) {
            res.status(404).json({error: `Cette tâche n'existe pas.`});
        }
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json({ error: `Une erreur s'est produite lors de la suppression de la tâche.` });
    }
}



module.exports = {
    getCalendars,
    createCalendar,
    deleteCalendar,
    updateCalendar
} 