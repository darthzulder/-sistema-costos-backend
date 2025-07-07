// db/tests/insertDataTest.js
const insertarMateriaPrima = require('../inserts/materiaPrima');


async function runAll() {
  try {
    // Datos de prueba centralizados
    const materiasPrimas = [
      { nom_mp: 'Harina de trigo', descrip_mp: 'Harina blanca 000', idproveedor: 1 }
    ];

    // Ejecución de cada módulo insert
    for (const mp of materiasPrimas) await insertarMateriaPrima(mp);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
