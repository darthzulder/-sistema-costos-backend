require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  // Configuración SSL requerida para Supabase
  ssl: {
    rejectUnauthorized: false
  },
  // Configuración de conexión
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  statement_timeout: 60000,
  query_timeout: 60000,
});

// Manejo de errores del pool
pool.on('error', (err) => {
  console.error('❌ Error en el pool de conexiones:', err.message);
});

pool.on('connect', (client) => {
  console.log('✅ Nueva conexión establecida');
});

console.log('🔧 Configuración del pool:');
console.log('Host:', process.env.DB_HOST);
console.log('Database:', process.env.DB_NAME);
console.log('User:', process.env.DB_USER);
console.log('Port:', process.env.DB_PORT);
console.log('SSL configurado:', !!pool.options.ssl);

module.exports = pool;