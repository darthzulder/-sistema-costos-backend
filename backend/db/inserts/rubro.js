const pool = require('../pool');

async function insertarRubro({nombre, descripcion}) {
  const query = `
    INSERT INTO Rubro (Nom_Rubro, Descrip_Rubro)
    VALUES ($1, $2)
    RETURNING *`;
  const values = [nombre, descripcion];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarRubro;
