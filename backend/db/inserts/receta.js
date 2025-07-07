const pool = require('../pool');

async function insertReceta({nom_receta, idproducto, fecha, version}) {
  const query = `
    INSERT INTO Receta (Nom_Receta, IDProducto, Fecha, Version)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [nom_receta, idproducto, fecha, version];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertReceta;


