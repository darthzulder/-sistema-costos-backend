const insertarEmpresa = require('../db/inserts/empresa');
const insertarEmpresaUsuario = require('../db/inserts/empresaUsuario');
const pool = require('../db/pool');

exports.crearEmpresa = async (req, res) => {
  const {nombre, idPais, idMoneda, descripcion} = req.body;
  const idusuario = req.user.id;

  try {
    // 1. Insertar la empresa
    const nuevaEmpresa = await insertarEmpresa({
      nombre,
      idPais,
      idMoneda,
      descripcion
    });

    // 2. Relacionar al usuario con la empresa como propietario
    await insertarEmpresaUsuario({
	  idUsuario: idusuario,
	  idEmpresa: nuevaEmpresa.idempresa,
	  permisos: 'admin',
	  esPropietario: true
    });

    res.status(201).json({
      mensaje: 'Empresa creada con éxito',
      empresa: nuevaEmpresa
    });
  } catch (error) {
    console.error('Error al crear empresa:', error.message);
    res.status(500).json({ error: 'Error al crear empresa' });
  }
};

// Consulta protegida para ver una empresa del usuario
exports.obtenerEmpresaPorID = async (req, res) => {
  const idEmpresa = parseInt(req.params.id);
  const idUsuario = req.user.id;

  try {
    // Validar que este usuario tiene acceso a esa empresa
    const validacion = await pool.query(`
      SELECT e.* FROM Empresa e
      INNER JOIN Empresa_Usuario eu ON e.IDEmpresa = eu.IDEmpresa
      WHERE e.IDEmpresa = $1 AND eu.IDUsuario = $2
    `, [idEmpresa, idUsuario]);

    if (validacion.rows.length === 0) {
      return res.status(403).json({ error: 'Acceso no autorizado a esta empresa' });
    }

    res.json({ empresa: validacion.rows[0] });
  } catch (error) {
    console.error('Error al obtener empresa:', error.message);
    res.status(500).json({ error: 'Error al obtener la empresa' });
  }
};