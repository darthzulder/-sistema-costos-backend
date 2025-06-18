const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/pool');
const insertarUsuario = require('../db/inserts/usuario');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const correo = profile.emails[0].value;
    const nombre = profile.displayName;

    try {
      const res = await pool.query(
        'SELECT * FROM Usuario WHERE Correo = $1',
        [correo]
      );

      if (res.rows.length === 0) {
        const nuevoUsuario = await insertarUsuario({
          correo,
          nombre,
          tipo_usuario: 'google'
        });
        return done(null, nuevoUsuario);
      }

      return done(null, res.rows[0]);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.idusuario);
});

passport.deserializeUser(async (id, done) => {
  const res = await pool.query('SELECT * FROM Usuario WHERE IDUsuario = $1', [id]);
  done(null, res.rows[0]);
});
/*const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/pool');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const correo = profile.emails[0].value;
    const nombre = profile.displayName;

    try {
      const res = await pool.query(
        'SELECT * FROM Usuario WHERE Correo = $1',
        [correo]
      );

      if (res.rows.length === 0) {
        const insert = await pool.query(
          `INSERT INTO Usuario (Correo, Nombre) VALUES ($1, $2) RETURNING *`,
          [correo, nombre]
        );
        return done(null, insert.rows[0]);
      }

      return done(null, res.rows[0]);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.idusuario);
});

passport.deserializeUser(async (id, done) => {
  const res = await pool.query('SELECT * FROM Usuario WHERE IDUsuario = $1', [id]);
  done(null, res.rows[0]);
});*/
