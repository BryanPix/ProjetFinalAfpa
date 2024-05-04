// on call le package express
const express = require("express");
const {
  getToDo,
  createToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/toDoListController");

const requireAuth = require('../middleware/requireAuth');

// on associe le router express à une constante
const router = express.Router();

// Permet de proteger les routes en dessous  car pour le CRUD il faut pouvoir s'identifier
router.use(requireAuth);

//on attache la constante router a un handler
// recupere toutes les tâches
router.get("/", getToDo);

// Ajoute une tâche
router.post("/", createToDo);

// Mise à jour d'une tâche
router.patch('/:id', updateToDo);

// Supprime une tâche

router.delete("/:id", deleteToDo);

module.exports = router;
