require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('./config/passport');
const authRoutes = require('./routes/auth');
const googleAuth = require('./routes/googleAuth');
const testProtectedRoutes = require('./routes/testProtected');
const empresaRoutes = require('./routes/empresa');


// Inicializa la app
const app = express();

// 1. Middlewares base
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// 2. Sesión y Passport
app.use(session({
  secret: 'claveparasesion',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1 día
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// 3. Rutas (ahora passport ya está listo)
app.use('/auth', authRoutes);
app.use('/auth', googleAuth);
app.use('/test', testProtectedRoutes);
app.use('/empresas', empresaRoutes);



// Rutas base
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando correctamente.');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
