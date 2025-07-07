// db/tests/insertDataTest.js
const insertarLicencia = require('../inserts/licencia');

async function runAll() {
  try {
    // Datos de prueba centralizados

    const licencias = [
      { idUsuario: 1, fechaInicio: '2024-01-01', fechaFin: '2025-01-01' }
    ];

    // Ejecución de cada módulo insert

    for (const lic of licencias) await insertarLicencia(lic);


    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
