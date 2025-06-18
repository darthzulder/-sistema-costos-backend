const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.vbhqfopxljjuxpsnlsuv',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '0Er1XY6mOT/', // ¡Pega aquí tu contraseña real!
  port: 6543,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a la base de datos');
    client.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

testConnection();
