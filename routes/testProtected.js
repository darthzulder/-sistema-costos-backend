const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta protegida de prueba
router.get('/protegido', authMiddleware, (req, res) => {
  res.json({
    mensaje: '✅ Acceso autorizado a ruta protegida',
    usuario: req.user
  });
});

module.exports = router;
