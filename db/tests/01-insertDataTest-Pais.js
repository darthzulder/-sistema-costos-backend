// db/tests/insertDataTest.js
const insertarPais = require('../inserts/pais');
/*const insertarMoneda = require('../inserts/moneda');
const insertarUsuario = require('../inserts/usuario');
const insertarEmpresa = require('../inserts/empresa');
const insertarRubro = require('../inserts/rubro');
const insertarRubroEmpresa = require('../inserts/rubroEmpresa');
const insertarEmpresaUsuario = require('../inserts/empresaUsuario');
const insertarLicencia = require('../inserts/licencia');
const insertarProveedor = require('../inserts/proveedor');
const insertarMateriaPrima = require('../inserts/materiaPrima');
const insertarProducto = require('../inserts/producto');
const insertarReceta = require('../inserts/receta');
const insertarRecetaMP = require('../inserts/recetaMP');*/

async function runAll() {
  try {
    // Datos de prueba centralizados
    const paises = [
      { nombre: 'Bolivia', codigo: '+591' },
      { nombre: 'Argentina', codigo: '+54' }
    ];
    /*const monedas = [
      { nombre: 'Boliviano', simbolo: 'Bs' },
      { nombre: 'Peso Argentino', simbolo: '$' }
    ];
    const usuarios = [
      { correo: 'juan2@gmail.com', nombre: 'Juan Pérez', clave: '1234', celular: '78945612', idPais: 1 }
    ];
    const empresas = [
      { nombre: 'Panadería El Trigal', idPais: 1, idMoneda: 1, descripcion: 'Panadería artesanal' }
    ];
    const rubros = [
      { nombre: 'Panadería', descripcion: 'Producción de pan y similares' }
    ];
    const rubrosEmpresa = [
      { idEmpresa: 1, idRubro: 1 }
    ];
    const empresaUsuario = [
      { idEmpresa: 1, idUsuario: 1, permisos: 'admin', esPropietario: true }
    ];
    const licencias = [
      { idUsuario: 1, fechaInicio: '2024-01-01', fechaFin: '2025-01-01' }
    ];
    const proveedores = [
      { nombre: 'Distribuidora Harina SRL', idPais: 1 }
    ];
    const materiasPrimas = [
      { nombre: 'Harina de trigo', descripcion: 'Harina blanca 000', idProveedor: 1 }
    ];
    const productos = [
      { idEmpresa: 1, nombre: 'Pan de batalla', descripcion: 'Pan tradicional', lote: 100, merma: 5.0 }
    ];
    const recetas = [
      { nombre: 'Receta 1', idProducto: 1, fecha: '2025-04-10', version: 1 }
    ];
    const recetaMPs = [
      { idReceta: 1, idMP: 1, cantidad: 25.5, precio: 12.75, fechaCotizacion: '2025-04-10', version: 1 }
    ];*/

    // Ejecución de cada módulo insert
    for (const pais of paises) await insertarPais(pais);
    /*for (const moneda of monedas) await insertarMoneda(moneda);
    for (const usuario of usuarios) await insertarUsuario(usuario);
    for (const empresa of empresas) await insertarEmpresa(empresa);
    for (const rubro of rubros) await insertarRubro(rubro);
    for (const re of rubrosEmpresa) await insertarRubroEmpresa(re);
    for (const eu of empresaUsuario) await insertarEmpresaUsuario(eu);
    for (const lic of licencias) await insertarLicencia(lic);
    for (const prov of proveedores) await insertarProveedor(prov);
    for (const mp of materiasPrimas) await insertarMateriaPrima(mp);
    for (const prod of productos) await insertarProducto(prod);
    for (const rec of recetas) await insertarReceta(rec);
    for (const rmp of recetaMPs) await insertarRecetaMP(rmp);*/

    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
