require('dotenv').config({ path: '.env' });

console.log('🔍 Verificando variables de entorno...\n');

// Variables requeridas para la base de datos
const requiredVars = [
  'DB_USER',
  'DB_HOST', 
  'DB_NAME',
  'DB_PASSWORD',
  'DB_PORT',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'JWT_SECRET'
];

// Variables opcionales
const optionalVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'PORT',
  'NODE_ENV'
];

console.log('📋 Variables Requeridas:');
let missingRequired = 0;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Configurada`);
  } else {
    console.log(`❌ ${varName}: No configurada`);
    missingRequired++;
  }
});

console.log('\n📋 Variables Opcionales:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Configurada`);
  } else {
    console.log(`⚠️  ${varName}: No configurada (opcional)`);
  }
});

console.log('\n📊 Resumen:');
if (missingRequired === 0) {
  console.log('✅ Todas las variables requeridas están configuradas');
  console.log('🚀 El backend debería funcionar correctamente');
} else {
  console.log(`❌ Faltan ${missingRequired} variables requeridas`);
  console.log('\n🔧 Para configurar:');
  console.log('1. Copia backend/process.env.example a backend/.env');
  console.log('2. Edita backend/.env con tus valores reales');
  console.log('3. Obtén DB_PASSWORD desde Supabase Dashboard > Settings > Database');
}

console.log('\n📁 Archivo .env encontrado:', require('fs').existsSync('.env') ? '✅ Sí' : '❌ No'); 