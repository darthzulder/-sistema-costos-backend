const pool = require('./db/pool');

async function checkTables() {
  try {
    console.log('🔍 Verificando tablas en la base de datos...\n');
    
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (result.rows.length === 0) {
      console.log('❌ No se encontraron tablas en la base de datos');
    } else {
      console.log('📋 Tablas existentes:');
      result.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.table_name}`);
      });
      
      // Verificar específicamente la tabla Usuario
      const usuarioExists = result.rows.some(t => 
        t.table_name.toLowerCase() === 'usuario' || 
        t.table_name === 'Usuario' ||
        t.table_name === 'USUARIO'
      );
      
      console.log(`\n🔍 Tabla "Usuario" existe: ${usuarioExists ? '✅ SÍ' : '❌ NO'}`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkTables(); 