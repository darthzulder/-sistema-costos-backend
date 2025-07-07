const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.vbhqfopxljjuxpsnlsuv',
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: '0Er1XY6mOT/',
  port: 6543,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function insertarDatosDePrueba() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Insertar país y moneda
    const pais = await client.query(`
      INSERT INTO Pais (Nom_Pais, Codigo_Cel)
      VALUES ('Bolivia', '+591')
      RETURNING IDPais;
    `);

    const moneda = await client.query(`
      INSERT INTO Moneda (Nom_Moneda, Simbolo)
      VALUES ('Boliviano', 'Bs.')
      RETURNING IDMoneda;
    `);

    const idPais = pais.rows[0].idpais;
    const idMoneda = moneda.rows[0].idmoneda;

    // 2. Insertar usuario
    const usuario = await client.query(`
      INSERT INTO Usuario (Correo, Nombre, Clave, Celular, IDPais)
      VALUES ('juan@example.com', 'Juan Pérez', '1234', '77777777', ${idPais})
      RETURNING IDUsuario;
    `);
    const idUsuario = usuario.rows[0].idusuario;

    // 3. Insertar empresa
    const empresa = await client.query(`
      INSERT INTO Empresa (Nom_Empresa, IDPais, IDMoneda, Descrip_Empresa)
      VALUES ('La Galletera S.R.L', ${idPais}, ${idMoneda}, 'Fábrica de galletas artesanales')
      RETURNING IDEmpresa;
    `);
    const idEmpresa = empresa.rows[0].idempresa;

    // 4. Relacionar empresa con usuario
    await client.query(`
      INSERT INTO Empresa_Usuario (IDEmpresa, IDUsuario, Permisos, Es_Propietario)
      VALUES (${idEmpresa}, ${idUsuario}, 'admin', TRUE);
    `);

    // 5. Crear rubro y asignarlo a la empresa
    const rubro = await client.query(`
      INSERT INTO Rubro (Nom_Rubro, Descrip_Rubro)
      VALUES ('Galletera', 'Producción de galletas')
      RETURNING IDRubro;
    `);
    const idRubro = rubro.rows[0].idrubro;

    await client.query(`
      INSERT INTO Rubro_Empresa (IDEmpresa, IDRubro)
      VALUES (${idEmpresa}, ${idRubro});
    `);

    // 6. Crear producto
    const producto = await client.query(`
      INSERT INTO Producto (IDEmpresa, Nom_Producto, Descrip_Producto, Lote, Merma)
      VALUES (${idEmpresa}, 'Galleta de avena', 'Galleta saludable', 100, 5.5)
      RETURNING IDProducto;
    `);
    const idProducto = producto.rows[0].idproducto;

    // 7. Crear receta
    const receta = await client.query(`
      INSERT INTO Receta (Nom_Receta, IDProducto, Fecha, Version)
      VALUES ('Receta 1', ${idProducto}, CURRENT_DATE, 1)
      RETURNING IDReceta;
    `);
    const idReceta = receta.rows[0].idreceta;

    // 8. Crear proveedor y materia prima
    const proveedor = await client.query(`
      INSERT INTO Proveedor (Nom_Proveedor, IDPais)
      VALUES ('Proveedor de Harina', ${idPais})
      RETURNING IDProveedor;
    `);
    const idProveedor = proveedor.rows[0].idproveedor;

    const mp = await client.query(`
      INSERT INTO Materia_Prima (Nom_MP, Descrip_MP, IDProveedor)
      VALUES ('Harina de avena', 'Harina integral de avena', ${idProveedor})
      RETURNING IDMP;
    `);
    const idMP = mp.rows[0].idmp;

    // 9. Asociar materia prima con receta
    await client.query(`
      INSERT INTO Receta_MP (IDReceta, IDMP, Cantidad, Precio, Fecha_Cotizacion, Version)
      VALUES (${idReceta}, ${idMP}, 5.25, 10.00, CURRENT_DATE, 1);
    `);

    await client.query('COMMIT');
    console.log('✅ Datos de prueba insertados correctamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al insertar los datos de prueba:', error);
  } finally {
    client.release();
  }
}

insertarDatosDePrueba();
