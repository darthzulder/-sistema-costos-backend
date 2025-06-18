// db/tests/insertDataTest.js
const insertarEmpresaUsuario = require('../inserts/empresaUsuario');


async function runAll() {
  try {
    // Datos de prueba centralizados
   
    const empresaUsuario = [
      { idEmpresa: 5, idUsuario: 5, permisos: 'admin', esPropietario: false }
    ];

    // Ejecución de cada módulo insert

    for (const eu of empresaUsuario) await insertarEmpresaUsuario(eu);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
