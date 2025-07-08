require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const https = require('https');
const http = require('http');

console.log('🔍 Diagnóstico de problemas de conectividad con Supabase...\n');

// 1. Verificar variables de entorno
console.log('📋 1. Verificando variables de entorno:');
const requiredVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
let envOk = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${varName === 'DB_PASSWORD' ? '***' : value}`);
  } else {
    console.log(`  ❌ ${varName}: No configurada`);
    envOk = false;
  }
});

console.log('');

// 2. Verificar conectividad de red
console.log('🌐 2. Verificando conectividad de red:');

// Probar conectividad básica a internet
function testInternetConnection() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'www.google.com',
      port: 80,
      path: '/',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      console.log('  ✅ Conectividad a internet: OK');
      resolve(true);
    });

    req.on('error', (err) => {
      console.log('  ❌ Conectividad a internet: Falló');
      console.log(`     Error: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('  ❌ Conectividad a internet: Timeout');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Probar conectividad a Supabase
function testSupabaseConnection() {
  return new Promise((resolve) => {
    if (!process.env.DB_HOST) {
      console.log('  ❌ No se puede probar Supabase: DB_HOST no configurado');
      resolve(false);
      return;
    }

    const req = https.request({
      hostname: process.env.DB_HOST,
      port: 443,
      path: '/',
      method: 'GET',
      timeout: 10000,
      rejectUnauthorized: false
    }, (res) => {
      console.log(`  ✅ Conectividad a Supabase (${process.env.DB_HOST}): OK`);
      console.log(`     Status: ${res.statusCode}`);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log(`  ❌ Conectividad a Supabase (${process.env.DB_HOST}): Falló`);
      console.log(`     Error: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`  ❌ Conectividad a Supabase (${process.env.DB_HOST}): Timeout`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// 3. Probar conexión PostgreSQL con diferentes configuraciones
async function testPostgreSQLConnection() {
  console.log('\n🗄️  3. Probando conexión PostgreSQL:');

  // Configuración 1: Conexión directa con SSL
  console.log('  🔌 Probando conexión directa con SSL...');
  try {
    const pool1 = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 10000
    });

    const client = await pool1.connect();
    console.log('  ✅ Conexión directa con SSL: Exitosa');
    
    // Probar consulta simple
    const result = await client.query('SELECT NOW() as current_time');
    console.log(`     Hora del servidor: ${result.rows[0].current_time}`);
    
    client.release();
    await pool1.end();
    return true;
  } catch (error) {
    console.log(`  ❌ Conexión directa con SSL: ${error.message}`);
  }

  // Configuración 2: Conexión sin SSL (fallback)
  console.log('  🔌 Probando conexión sin SSL...');
  try {
    const pool2 = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      connectionTimeoutMillis: 10000
    });

    const client = await pool2.connect();
    console.log('  ✅ Conexión sin SSL: Exitosa');
    client.release();
    await pool2.end();
    return true;
  } catch (error) {
    console.log(`  ❌ Conexión sin SSL: ${error.message}`);
  }

  return false;
}

// 4. Probar cliente Supabase JS
async function testSupabaseJS() {
  console.log('\n🌐 4. Probando cliente Supabase JS:');
  
  try {
    const { createClient } = require('@supabase/supabase-js');
    
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error('SUPABASE_URL o SUPABASE_ANON_KEY no configuradas');
    }
    
    console.log('  🔧 Inicializando cliente Supabase...');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('  🔍 Probando consulta simple...');
    const { data, error } = await supabase
      .from('usuario')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log(`  ❌ Error en consulta Supabase: ${error.message}`);
      return false;
    } else {
      console.log('  ✅ Cliente Supabase JS: Funcionando');
      return true;
    }
  } catch (error) {
    console.log(`  ❌ Error con Supabase JS: ${error.message}`);
    
    if (error.message.includes('fetch failed')) {
      console.log('  💡 Posibles causas del error "fetch failed":');
      console.log('     - Problema de conectividad de red');
      console.log('     - Firewall bloqueando conexiones');
      console.log('     - Proxy o VPN interfiriendo');
      console.log('     - Variables SUPABASE_URL o SUPABASE_ANON_KEY incorrectas');
    }
    
    return false;
  }
}

// Función principal
async function runDiagnosis() {
  const internetOk = await testInternetConnection();
  const supabaseOk = await testSupabaseConnection();
  
  if (envOk && internetOk) {
    const pgOk = await testPostgreSQLConnection();
    const supabaseJSOk = await testSupabaseJS();
    
    console.log('\n📊 Resumen del diagnóstico:');
    console.log(`  🌐 Internet: ${internetOk ? '✅' : '❌'}`);
    console.log(`  🗄️  Supabase Host: ${supabaseOk ? '✅' : '❌'}`);
    console.log(`  🔌 PostgreSQL: ${pgOk ? '✅' : '❌'}`);
    console.log(`  🌐 Supabase JS: ${supabaseJSOk ? '✅' : '❌'}`);
    
    if (pgOk && supabaseJSOk) {
      console.log('\n🎉 ¡Todo está funcionando correctamente!');
    } else {
      console.log('\n🔧 Problemas detectados. Revisa las recomendaciones arriba.');
    }
  } else {
    console.log('\n❌ Problemas básicos detectados:');
    if (!envOk) console.log('  - Variables de entorno faltantes');
    if (!internetOk) console.log('  - Problema de conectividad a internet');
  }
}

runDiagnosis().catch(console.error); 