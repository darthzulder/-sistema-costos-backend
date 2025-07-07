const pool = require('../pool');

async function insertarEmpresaUsuario({idEmpresa, idUsuario, permisos, esPropietario = false}) {
  const query = `
    INSERT INTO Empresa_Usuario (IDEmpresa, IDUsuario, Permisos, Es_Propietario)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [idEmpresa, idUsuario, permisos, esPropietario];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarEmpresaUsuario;
