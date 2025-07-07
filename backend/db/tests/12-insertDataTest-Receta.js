// db/tests/insertDataTest.js

const insertarReceta = require('../inserts/receta');


async function runAll() {
  try {
    // Datos de prueba centralizados

    const recetas = [
      { nom_receta: 'Receta 1', idproducto: 1, fecha: '2025-04-10', version: 1 }
    ];


    // Ejecución de cada módulo insert

    for (const rec of recetas) await insertarReceta(rec);
 

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
