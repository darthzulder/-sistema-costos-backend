const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro manual
router.post(
  '/register',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('clave').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  authController.registerManual
);

// Login manual
router.post('/login', authController.loginManual);

module.exports = router;
