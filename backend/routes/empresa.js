const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear una empresa (protegida por token)
router.post('/', authMiddleware, empresaController.crearEmpresa);

module.exports = router;

// Obtener datos de una empresa específica (si el usuario tiene acceso)
router.get('/:id', authMiddleware, empresaController.obtenerEmpresaPorID);