const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Ruta para verificar el estado de Google OAuth
router.get('/google/status', (req, res) => {
  const isConfigured = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  
  res.json({
    configured: isConfigured,
    message: isConfigured 
      ? 'Google OAuth está configurado correctamente'
      : 'Google OAuth no está configurado. Faltan GOOGLE_CLIENT_ID y/o GOOGLE_CLIENT_SECRET'
  });
});

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

    // Enviar respuesta HTML que comunica con el popup
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Autenticación Google</title>
          <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              backdrop-filter: blur(10px);
            }
            .spinner {
              border: 3px solid rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              border-top: 3px solid white;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h2>Autenticación Exitosa</h2>
            <p>Cerrando ventana...</p>
          </div>
          <script>
            function sendMessageAndClose() {
              const message = {
                type: 'GOOGLE_AUTH_SUCCESS',
                token: '${token}',
                usuario: {
                  id: ${usuario.idusuario},
                  correo: '${usuario.correo}',
                  nombre: '${usuario.nombre}'
                }
              };
              
              if (window.opener) {
                try {
                  window.opener.postMessage(message, 'http://localhost:3001');
                } catch (error) {
                  console.error('Error enviando mensaje:', error);
                }
              }
              
              const messageString = JSON.stringify(message);
              document.cookie = 'googleAuthResult=' + encodeURIComponent(messageString) + '; path=/; max-age=60';
              
              setTimeout(() => {
                window.close();
              }, 1000);
            }
            
            sendMessageAndClose();
          </script>
        </body>
      </html>
    `;

    res.send(htmlResponse);
  }
);

// Ruta para manejar errores de autenticación
router.get('/google/error', (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error de Autenticación</title>
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">⚠️</div>
          <h2>Error de Autenticación</h2>
          <p>No se pudo completar la autenticación con Google.</p>
          <button onclick="window.close()" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 1rem;
          ">Cerrar</button>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH_ERROR',
              error: 'Error en la autenticación con Google'
            }, 'http://localhost:5173');
          }
        </script>
      </body>
    </html>
  `;

  res.send(htmlResponse);
});

module.exports = router;
