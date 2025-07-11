const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const insertarUsuario = require('../db/inserts/usuario');

// ✅ Registro manual
exports.registerManual = async (req, res) => {
  // Validación de datos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { correo, nombre, clave } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existe = await pool.query('SELECT 1 FROM Usuario WHERE Correo = $1', [correo]);
    if (existe.rows.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }

    const hash = await bcrypt.hash(clave, 10);
    const nuevoUsuario = await insertarUsuario({
      correo,
      nombre,
      clave: hash,
      tipo_usuario: 'manual'
    });

    res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en registro manual:', error.message);
    res.status(500).json({ error: 'No se pudo registrar el usuario' });
  }
};

// ✅ Login manual
exports.loginManual = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const query = `SELECT * FROM Usuario WHERE Correo = $1`;
    const { rows } = await pool.query(query, [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Correo no registrado' });
    }

    const usuario = rows[0];

    if (!usuario.clave) {
      return res.status(403).json({ error: 'Este usuario solo puede iniciar sesión con Google' });
    }

    const match = await bcrypt.compare(clave, usuario.clave);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.idusuario, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, usuario: { id: usuario.idusuario, correo: usuario.correo, nombre: usuario.nombre } });
  } catch (error) {
    console.error('Error en login manual:', error.message);
    res.status(500).json({ error: 'No se pudo iniciar sesión' });
  }
};
