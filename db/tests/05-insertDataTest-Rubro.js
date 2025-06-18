// db/tests/insertDataTest.js
const insertarRubro = require('../inserts/rubro');

async function runAll() {
  try {
    // Datos de prueba centralizados

    const rubros = [
      { nombre: 'Panadería', descripcion: 'Producción de pan y similares' }
    ];

    // Ejecución de cada módulo insert

    for (const rubro of rubros) await insertarRubro(rubro);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
