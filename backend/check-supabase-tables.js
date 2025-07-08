require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./db/pool');

async function checkSupabaseTables() {
  console.log('🔍 Verificando conexión y tablas en Supabase...\n');

  try {
    // Verificar conexión
    const client = await pool.connect();
    console.log('✅ Conexión a Supabase exitosa\n');

    // Verificar si existe la tabla Usuario
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'usuario'
    `);

    if (tableCheck.rows.length === 0) {
      console.log('❌ Tabla "usuario" NO existe en Supabase');
      console.log('🔧 Creando esquema completo...\n');
      
      // Leer y ejecutar el esquema
      const schemaPath = path.join(__dirname, 'db', 'schema.sql');
      const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
      
      await client.query(schemaSQL);
      console.log('✅ Esquema completo creado exitosamente en Supabase');
      
      // Insertar datos básicos
      console.log('🌱 Insertando datos básicos...');
      
      await client.query(`
        INSERT INTO Pais (Nombre, Codigo) VALUES 
        ('Perú', 'PER'),
        ('Estados Unidos', 'USA'),
        ('España', 'ESP')
        ON CONFLICT (Codigo) DO NOTHING
      `);
      
      await client.query(`
        INSERT INTO Moneda (Nombre, Codigo, Simbolo) VALUES 
        ('Sol Peruano', 'PEN', 'S/'),
        ('Dólar Estadounidense', 'USD', '$'),
        ('Euro', 'EUR', '€')
        ON CONFLICT (Codigo) DO NOTHING
      `);
      
      await client.query(`
        INSERT INTO Rubro (Nombre, Descripcion) VALUES 
        ('Manufactura', 'Sector de manufactura y producción'),
        ('Servicios', 'Sector de servicios'),
        ('Comercio', 'Sector comercial y retail')
        ON CONFLICT DO NOTHING
      `);
      
      console.log('✅ Datos básicos insertados');
      
    } else {
      console.log('✅ Tabla "usuario" existe en Supabase');
    }

    // Listar todas las tablas
    const allTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    console.log('\n📊 Tablas en Supabase:');
    allTables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    // Contar registros en tablas principales
    const userCount = await client.query('SELECT COUNT(*) FROM usuario');
    const paisCount = await client.query('SELECT COUNT(*) FROM pais');
    const monedaCount = await client.query('SELECT COUNT(*) FROM moneda');
    const rubroCount = await client.query('SELECT COUNT(*) FROM rubro');

    console.log('\n📈 Estadísticas:');
    console.log(`  - Usuarios: ${userCount.rows[0].count}`);
    console.log(`  - Países: ${paisCount.rows[0].count}`);
    console.log(`  - Monedas: ${monedaCount.rows[0].count}`);
    console.log(`  - Rubros: ${rubroCount.rows[0].count}`);

    client.release();
    console.log('\n🎉 Verificación completada exitosamente!');
    console.log('✅ El sistema está listo para usar');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Solución:');
      console.log('1. Ve a tu proyecto en Supabase Dashboard');
      console.log('2. Ve a Settings > Database');
      console.log('3. Copia la "Database Password"');
      console.log('4. Agrega DB_PASSWORD=tu_password en backend/.env');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Solución:');
      console.log('Verifica que las variables SUPABASE_URL y SUPABASE_ANON_KEY estén correctas en backend/.env');
    } else if (error.message.includes('relation does not exist')) {
      console.log('\n💡 Solución:');
      console.log('Ejecuta este script nuevamente para crear las tablas faltantes');
    }
  } finally {
    await pool.end();
  }
}

checkSupabaseTables(); 