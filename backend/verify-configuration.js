require('dotenv').config({ path: '.env' });
const pool = require('./db/pool');


/*const { Pool } = require('pg');
// CONFIGURA TU CONEXIÓN
const pool = new Pool({
  user: 'postgres',
  host: 'https://vbhqfopxljjuxpsnlsuv.supabase.co',
  database: 'postgres',
  password: '0Er1XY6mOT/',
  port: 5432, // Cambia si es necesario
});*/

async function verifyConfiguration() {
  console.log('🔍 Verificación completa de la configuración del backend...\n');

  // 1. Verificar variables de entorno
  console.log('📋 1. Verificando variables de entorno:');
  const requiredVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
  const supabaseVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const jwtVars = ['JWT_SECRET'];
  
  let allGood = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`  ✅ ${varName}: Configurada`);
    } else {
      console.log(`  ❌ ${varName}: No configurada`);
      allGood = false;
    }
  });
  
  supabaseVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`  ✅ ${varName}: Configurada`);
    } else {
      console.log(`  ❌ ${varName}: No configurada`);
      allGood = false;
    }
  });
  
  jwtVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`  ✅ ${varName}: Configurada`);
    } else {
      console.log(`  ❌ ${varName}: No configurada`);
      allGood = false;
    }
  });

  console.log('');

  // 2. Verificar conexión a la base de datos
  if (allGood) {
    console.log('🔌 2. Probando conexión a la base de datos:');
    try {
      const client = await pool.connect();
      console.log('  ✅ Conexión exitosa');
      
      // Verificar tablas principales
      const tables = ['usuario', 'empresa', 'pais', 'moneda', 'rubro'];
      console.log('  📊 Verificando tablas principales:');
      
      for (const table of tables) {
        try {
          const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
          console.log(`    ✅ ${table}: ${result.rows[0].count} registros`);
        } catch (error) {
          console.log(`    ❌ ${table}: No existe`);
        }
      }
      
      client.release();
    } catch (error) {
      console.log(`  ❌ Error de conexión: ${error.message}`);
      allGood = false;
    }
  } else {
    console.log('⚠️  2. Saltando prueba de conexión (variables faltantes)');
  }

  console.log('');

  // 3. Verificar cliente Supabase JS
  console.log('🌐 3. Probando cliente Supabase JS:');
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('Variables de Supabase no configuradas');
    }
    
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    console.log('  ✅ Cliente Supabase inicializado correctamente');
    
    // Probar una consulta simple
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`  ⚠️  Error en consulta: ${error.message}`);
    } else {
      console.log('  ✅ Consulta a Supabase exitosa');
    }
  } catch (error) {
    console.log(`  ❌ Error con Supabase: ${error.message}`);
    
    if (error.message.includes('fetch failed')) {
      console.log('  💡 Posibles causas del error "fetch failed":');
      console.log('     - Problema de conectividad de red');
      console.log('     - Firewall bloqueando conexiones');
      console.log('     - Variables SUPABASE_URL o SUPABASE_ANON_KEY incorrectas');
    }
    
    allGood = false;
  }

  console.log('');

  // 4. Resumen final
  console.log('📊 4. Resumen de la verificación:');
  if (allGood) {
    console.log('  ✅ Configuración completa y funcional');
    console.log('  🚀 El backend está listo para usar');
    console.log('');
    console.log('  💡 Próximos pasos:');
    console.log('    1. Ejecutar: docker-compose up');
    console.log('    2. Probar registro de usuarios');
    console.log('    3. Verificar autenticación');
  } else {
    console.log('  ❌ Hay problemas en la configuración');
    console.log('');
    console.log('  🔧 Para solucionar:');
    console.log('    1. Verifica el archivo backend/.env');
    console.log('    2. Asegúrate de que todas las variables estén configuradas');
    console.log('    3. Obtén DB_PASSWORD desde Supabase Dashboard');
    console.log('    4. Ejecuta: node diagnose-connection.js');
  }

  // Cerrar conexiones
  if (allGood) {
    await pool.end();
  }
}

verifyConfiguration().catch(console.error); 