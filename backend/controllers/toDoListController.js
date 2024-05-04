const toDoList = require('../models/toDoListModel');
const mongoose = require('mongoose');


// récupere toutes les tâches
const getToDo = async (req, res) => {
    const user_id = req.user._id;

    const toDo = await toDoList.find({ user_id }).sort({createdAt: -1}) // permet de trouver toutes les tâches et de les trier par ancienneté du plus récent au plus ancien par rapport au client connecté

    res.status(200).json(toDo);
}

// créer une tâche à effectuer
const createToDo = async (req, res) => {
    const { title } = req.body; 

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir le champ.', emptyFields })
    }

    // Ajoute la tâche à la base de données
    try {
        const user_id = req.user._id
        const toDo = await toDoList.create({ title, user_id }); 
        res.status(200).json(toDo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Mise à jour d'une tâche du calendrier
const updateToDo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `Cette tâche n'existe pas.`});
    }
    
    const toDo = await toDoList.findOneAndUpdate(
        { _id: id }, 
        { ...req.body }, 
        { new: true }
    );

    if (!toDo) {
        res.status(404).json({error: `Cette tâche n'existe pas.`});
    }
    res.status(200).json(toDo);
}

// supprime une tâche
const deleteToDo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `Cette tâche n'existe pas.` });
    }

    try {
        const toDo = await toDoList.findOneAndDelete({ _id: id });
        if (!toDo) {
            return res.status(404).json({ error: `Cette tâche n'existe pas.` });
        }
        res.status(200).json(toDo); 
    } catch (error) {
        res.status(500).json({ error: `Une erreur s'est produite lors de la suppression de la tâche.` });
    }
}


module.exports = {
    getToDo,
    createToDo,
    deleteToDo,
    updateToDo,
} 