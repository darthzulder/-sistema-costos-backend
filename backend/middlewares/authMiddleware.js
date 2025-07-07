const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
function authMiddleware(req, res, next) {
  // 1. Leer el encabezado Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];

  // Si no hay header o no empieza con Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  // 2. Extraer el token
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Adjuntar el usuario decodificado a la solicitud
    req.user = decoded;

    // 5. Continuar a la siguiente función
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

module.exports = authMiddleware;
