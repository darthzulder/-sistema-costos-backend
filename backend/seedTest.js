// seedTest.js
require('dotenv').config();
const { Pool } = require('pg');

// CONFIGURACIÓN DESDE VARIABLES DE ENTORNO
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function seedData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Países
    await client.query(`INSERT INTO Pais (Nom_Pais, Codigo_Cel) VALUES
      ('Bolivia', '+591'),
      ('Argentina', '+54')`);

    // Monedas
    await client.query(`INSERT INTO Moneda (Nom_Moneda, Simbolo) VALUES
      ('Boliviano', 'Bs')`);

    // Usuarios
    await client.query(`INSERT INTO Usuario (Correo, Nombre, Clave, Celular, IDPais) VALUES
      ('juan@example.com', 'Juan Pérez', 'clave123', '78912345', 1),
      ('ana@example.com', 'Ana Gómez', 'clave456', '12345678', 2)`);

    // Empresas
    await client.query(`INSERT INTO Empresa (Nom_Empresa, IDPais, IDMoneda, Descrip_Empresa) VALUES
      ('La Francesa S.A.', 1, 1, 'Productora de alimentos'),
      ('Panadería del Sur', 2, 2, 'Empresa de panificados')`);

    // Rubros
    await client.query(`INSERT INTO Rubro (Nom_Rubro, Descrip_Rubro) VALUES
      ('Panadería', 'Elaboración de pan y derivados'),
      ('Repostería', 'Producción de pasteles y dulces')`);

    // Rubro_Empresa
    await client.query(`INSERT INTO Rubro_Empresa (IDEmpresa, IDRubro) VALUES
      (1, 1),
      (1, 2),
      (2, 1)`);

    // Empresa_Usuario
    await client.query(`INSERT INTO Empresa_Usuario (IDEmpresa, IDUsuario, Permisos, Es_Propietario) VALUES
      (1, 1, 'admin', TRUE),
      (2, 2, 'editor', TRUE)`);

    // Licencias
    await client.query(`INSERT INTO Licencia (IDUsuario, Fecha_Inicio, Fecha_Fin) VALUES
      (1, '2025-01-01', '2025-12-31'),
      (2, '2025-02-01', '2025-11-30')`);

    // Proveedores
    await client.query(`INSERT INTO Proveedor (Nom_Proveedor, IDPais) VALUES
      ('Proveedor Uno', 1),
      ('Harinas del Sur', 2)`);

    // Materias primas
    await client.query(`INSERT INTO Materia_Prima (Nom_MP, Descrip_MP, IDProveedor) VALUES
      ('Harina de Trigo', 'Harina blanca refinada', 2),
      ('Azúcar', 'Azúcar blanca', 1),
      ('Manteca', 'Manteca vegetal', 1)`);

    // Productos
    await client.query(`INSERT INTO Producto (IDEmpresa, Nom_Producto, Descrip_Producto, Lote, Merma) VALUES
      (1, 'Pan Blanco', 'Pan clásico para desayuno', 100, 5.0),
      (2, 'Bizcochuelo', 'Bizcochuelo esponjoso', 200, 8.5)`);

    // Recetas
    await client.query(`INSERT INTO Receta (Nom_Receta, IDProducto, Fecha, Version) VALUES
      ('Pan Blanco v1', 1, '2025-03-01', 1),
      ('Bizcochuelo v1', 2, '2025-03-05', 1)`);

    // Receta_MP
    await client.query(`INSERT INTO Receta_MP (IDReceta, IDMP, Cantidad, Precio, Fecha_Cotizacion, Version) VALUES
      (1, 1, 25.0000, 5.50, '2025-02-20', 1),
      (1, 2, 10.0000, 4.20, '2025-02-20', 1),
      (2, 1, 20.0000, 5.60, '2025-02-22', 1),
      (2, 2, 12.0000, 4.30, '2025-02-22', 1),
      (2, 3, 5.0000, 6.00, '2025-02-22', 1)`);

    await client.query('COMMIT');
    console.log('✅ Datos de prueba insertados correctamente');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error al insertar datos de prueba:', err);
  } finally {
    client.release();
  }
}

seedData();
