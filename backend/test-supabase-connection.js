require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

// Usar la misma configuración que pool.js
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function testConnections() {
  console.log('🔍 Verificando conexiones a Supabase...\n');

  // 1. Verificar variables de entorno
  console.log('📋 Variables de entorno:');
  console.log('DB_USER:', process.env.DB_USER ? '✅ Configurada' : '❌ No configurada');
  console.log('DB_HOST:', process.env.DB_HOST ? '✅ Configurada' : '❌ No configurada');
  console.log('DB_NAME:', process.env.DB_NAME ? '✅ Configurada' : '❌ No configurada');
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ Configurada' : '❌ No configurada');
  console.log('DB_PORT:', process.env.DB_PORT ? '✅ Configurada' : '❌ No configurada');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Configurada' : '❌ No configurada');
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ No configurada');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Configurada' : '❌ No configurada');
  console.log('');

  // 2. Probar conexión a la base de datos
  if (process.env.DB_PASSWORD && process.env.DB_HOST) {
    console.log('🔌 Probando conexión a la base de datos...');
    try {
      const client = await pool.connect();
      console.log('✅ Conexión a la base de datos exitosa');
      
      // Verificar si existe la tabla Usuario
      const tableCheck = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'usuario'
      `);
      
      if (tableCheck.rows.length > 0) {
        console.log('✅ Tabla "usuario" existe en la base de datos');
        
        // Contar usuarios
        const userCount = await client.query('SELECT COUNT(*) FROM usuario');
        console.log(`📊 Usuarios en la base de datos: ${userCount.rows[0].count}`);
      } else {
        console.log('❌ Tabla "usuario" NO existe en la base de datos');
        
        // Listar todas las tablas disponibles
        const allTables = await client.query(`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
          ORDER BY table_name
        `);
        
        if (allTables.rows.length > 0) {
          console.log('📋 Tablas disponibles:');
          allTables.rows.forEach(row => {
            console.log(`  - ${row.table_name}`);
          });
        } else {
          console.log('⚠️  No hay tablas en la base de datos');
        }
      }
      
      client.release();
    } catch (error) {
      console.log('❌ Error en conexión a la base de datos:', error.message);
    }
  } else {
    console.log('⚠️  No se puede probar la base de datos: faltan variables de entorno');
  }
  console.log('');

  // 3. Probar cliente Supabase JS
  console.log('🔌 Probando cliente Supabase JS...');
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('SUPABASE_URL y SUPABASE_ANON_KEY son requeridas');
    }
    
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // Intentar una consulta simple
    const { data, error } = await supabase
      .from('usuario')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Error con cliente Supabase JS:', error.message);
    } else {
      console.log('✅ Cliente Supabase JS funciona correctamente');
      console.log('📊 Datos de prueba:', data);
    }
  } catch (error) {
    console.log('❌ Error inicializando cliente Supabase JS:', error.message);
  }

  // Cerrar conexiones
  if (process.env.DB_PASSWORD && process.env.DB_HOST) {
    await pool.end();
  }
}

testConnections().catch(console.error); 