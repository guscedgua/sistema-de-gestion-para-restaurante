// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
