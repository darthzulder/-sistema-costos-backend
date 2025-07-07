const pool = require('../pool');

async function insertarRubroEmpresa({idEmpresa, idRubro}) {
  const query = `
    INSERT INTO Rubro_Empresa (IDEmpresa, IDRubro)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [idEmpresa, idRubro];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarRubroEmpresa;
