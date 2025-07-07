const pool = require('../pool');

async function insertarEmpresa({nombre, idPais, idMoneda, descripcion}) {
  const query = `
    INSERT INTO Empresa (Nom_Empresa, IDPais, IDMoneda, Descrip_Empresa)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
  const values = [nombre, idPais, idMoneda, descripcion];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarEmpresa;
