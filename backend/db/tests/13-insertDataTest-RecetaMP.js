// db/tests/insertDataTest.js

const insertarRecetaMP = require('../inserts/recetaMP');

async function runAll() {
  try {
    // Datos de prueba centralizados
 
    const recetaMPs = [
      { idreceta: 2, idmp: 1, cantidad: 25.5, precio: 12.75, fecha_cotizacion: '2025-04-10', version: 1 }
    ];

    // Ejecución de cada módulo insert
 
    for (const rmp of recetaMPs) await insertarRecetaMP(rmp);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
