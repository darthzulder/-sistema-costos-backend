const passport = require('passport');
const pool = require('./db/pool');
const insertarUsuario = require('./db/inserts/usuario');

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
  console.log('✅ Google OAuth2 habilitado en Passport');
} else {
  console.log('ℹ️  Google OAuth2 NO configurado: faltan GOOGLE_CLIENT_ID y/o GOOGLE_CLIENT_SECRET');
}

passport.serializeUser((user, done) => {
  done(null, user.idusuario);
});

passport.deserializeUser(async (id, done) => {
  const res = await pool.query('SELECT * FROM Usuario WHERE IDUsuario = $1', [id]);
  done(null, res.rows[0]);
});
