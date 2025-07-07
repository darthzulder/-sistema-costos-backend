const insertarPais = require('../inserts/pais');
const insertarMoneda = require('../inserts/moneda');
const insertarUsuario = require('../inserts/usuario');
const insertarEmpresa = require('../inserts/empresa');
const insertarRubro = require('../inserts/rubro');
const insertarRubroEmpresa = require('../inserts/rubroEmpresa');
const insertarEmpresaUsuario = require('../inserts/empresaUsuario');
const insertarLicencia = require('../inserts/licencia');

async function ejecutarInsertsDePrueba() {
  try {
    // 1. Insertar un país y moneda
    const pais = await insertarPais('Bolivia', '+591');
    console.log('✅ País insertado:', pais);

    const moneda = await insertarMoneda('Boliviano', 'Bs.');
    console.log('✅ Moneda insertada:', moneda);

    // 2. Insertar un usuario
    const usuario = await insertarUsuario(
      'juan@correo.com',
      'Juan Pérez',
      'clave_segura_123',
      '71234567',
      pais.idpais
    );
    console.log('✅ Usuario insertado:', usuario);

    // 3. Insertar una empresa
    const empresa = await insertarEmpresa(
      'La Francesa S.A.',
      pais.idpais,
      moneda.idmoneda,
      'Empresa dedicada a panadería y galletas.'
    );
    console.log('✅ Empresa insertada:', empresa);

    // 4. Insertar un rubro
    const rubro = await insertarRubro('Panadería', 'Producción de pan, masas y derivados.');
    console.log('✅ Rubro insertado:', rubro);

    // 5. Asignar rubro a la empresa
    const rubroEmpresa = await insertarRubroEmpresa(empresa.idempresa, rubro.idrubro);
    console.log('✅ Rubro vinculado a empresa:', rubroEmpresa);

    // 6. Asignar usuario a empresa
    const empresaUsuario = await insertarEmpresaUsuario(empresa.idempresa, usuario.idusuario, 'admin', true);
    console.log('✅ Usuario vinculado a empresa:', empresaUsuario);

    // 7. Asignar licencia
    const hoy = new Date();
    const enUnAño = new Date();
    enUnAño.setFullYear(hoy.getFullYear() + 1);

    const licencia = await insertarLicencia(usuario.idusuario, hoy, enUnAño);
    console.log('✅ Licencia asignada:', licencia);

    console.log('🎉 ¡Todos los datos fueron insertados correctamente!');
  } catch (error) {
    console.error('❌ Error durante la inserción de datos:', error);
  }
}

ejecutarInsertsDePrueba();
