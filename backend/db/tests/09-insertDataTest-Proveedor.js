// db/tests/insertDataTest.js
const insertarProveedor = require('../inserts/proveedor');

async function runAll() {
  try {
    // Datos de prueba centralizados
    
    const proveedores = [
      { nom_proveedor: 'Distribuidora Harina3 SRL', idPais: 1 }
    ];


    // Ejecución de cada módulo insert
    for (const prov of proveedores) await insertarProveedor(prov);


    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
