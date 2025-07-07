// db/tests/insertDataTest.js
const insertarEmpresa = require('../inserts/empresa');

async function runAll() {
  try {
    // Datos de prueba centralizados
    
    const empresas = [
      { nombre: 'Panadería El Trigal', idPais: 1, idMoneda: 1, descripcion: 'Panadería artesanal' }
    ];

    // Ejecución de cada módulo insert

    for (const empresa of empresas) await insertarEmpresa(empresa);

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
