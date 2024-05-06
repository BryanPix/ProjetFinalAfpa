const Calendar = require('../models/calendarModel');
const mongoose = require('mongoose');


// récuperation de toutes les tâches dans le calendrier
const getCalendars = async (req, res) => {
    const user_id = req.user._id;

    const calendars = await Calendar.find({ user_id }).sort({createdAt: -1}) // permet de trouver toutes les tâches du calendrier et de les trier par ancienté du plus recent au plus ancient

    res.status(200).json(calendars);
}
// récuperation d'une tâche dans le calendrier
// const getCalendar = async (req, res) => {
//     const user_id = req.user._id;
//     const { date } = req.query; // Supposons que la date soit fournie en tant que query parameter

//     const startDate = new Date(date); // Convertir la date fournie en objet Date

//     // Calculer la date de fin en ajoutant un jour à la date fournie
//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + 1);

//     // Filtrer les calendriers pour ceux qui tombent entre la date de début et la date de fin
//     const calendars = await Calendar.find({ 
//         user_id,
//         createdAt: {
//             $gte: startDate,
//             $lt: endDate
//         }
//     }).sort({createdAt: -1});

//     res.status(200).json(calendars);
// }
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
        const user_id = req.user._id
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
    // getCalendar,
    createCalendar,
    deleteCalendar,
    updateCalendar
} 