const pool = require('./db/pool');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error de conexión:', err.message);
  } else {
    console.log('✅ Conexión exitosa:', res.rows[0]);
  }
  pool.end();
});
