const express = require('express');

// fonction controller
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// connection
router.post('/login', loginUser);


// Inscription
router.post('/signup', signupUser);


module.exports = router