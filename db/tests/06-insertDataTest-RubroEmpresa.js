// db/tests/insertDataTest.js
const insertarRubroEmpresa = require('../inserts/rubroEmpresa');

async function runAll() {
  try {
    // Datos de prueba centralizados

    const rubrosEmpresa = [
      { idEmpresa: 1, idRubro: 2 }
    ];

    // Ejecución de cada módulo insert
    for (const re of rubrosEmpresa) await insertarRubroEmpresa(re);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
