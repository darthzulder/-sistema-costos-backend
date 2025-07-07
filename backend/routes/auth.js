const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro manual
router.post('/register', authController.registerManual);

// Login manual
router.post('/login', authController.loginManual);

module.exports = router;
