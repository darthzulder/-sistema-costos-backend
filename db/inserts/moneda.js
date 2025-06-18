const pool = require('../pool');

async function insertarMoneda({nombre, simbolo}) {
  const query = `INSERT INTO Moneda (Nom_Moneda, Simbolo) VALUES ($1, $2) RETURNING *`;
  const values = [nombre, simbolo];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarMoneda;
