const pool = require('../pool');

async function insertarPais({nombre, codigoCel}) {
  const query = `INSERT INTO Pais (Nom_Pais, Codigo_Cel) VALUES ($1, $2) RETURNING *`;
  const values = [nombre, codigoCel];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarPais;
