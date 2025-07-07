const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const usuario = req.user;

    const token = jwt.sign(
      {
        id: usuario.idusuario,
        correo: usuario.correo,
        nombre: usuario.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Inicio de sesión con Google exitoso',
      token,
      usuario: {
        id: usuario.idusuario,
        correo: usuario.correo,
        nombre: usuario.nombre
      }
    });
  }
);

/*router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Puedes redirigir al frontend o devolver el token aquí
    res.json({
      message: 'Inicio de sesión con Google exitoso',
      usuario: req.user
    });
  }
);*/

module.exports = router;
