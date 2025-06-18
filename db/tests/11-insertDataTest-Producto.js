// db/tests/insertDataTest.js

const insertarProducto = require('../inserts/producto');


async function runAll() {
  try {
    // Datos de prueba centralizados

    const productos = [
      { idempresa: 1, nom_producto: 'Pan de batalla', descrip_producto: 'Pan tradicional', lote: 100, merma: 5.0 }
    ];


    // Ejecución de cada módulo insert
 
    for (const prod of productos) await insertarProducto(prod);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
