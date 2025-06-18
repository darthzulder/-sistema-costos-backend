const insertarUsuario = require('../inserts/usuario');


async function runAll() {
  try {

    const usuarios = [
      { correo: 'juan3@gmail.com', nombre: 'Juan Pérez', clave: '012345', celular: '78945612', idPais: 1 }
    ];

    for (const usuario of usuarios) await insertarUsuario(usuario);


    console.log('✅ Todos los datos de prueba fueron insertados exitosamente.');
  } catch (error) {
    console.error('❌ Error ejecutando inserts:\n', error);
  }
}

runAll();
