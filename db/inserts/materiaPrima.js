const pool = require('../pool');

async function insertMateriaPrima({nom_mp, descrip_mp, idproveedor}) {
  const query = `
    INSERT INTO Materia_Prima (nom_mp, descrip_mp, idproveedor)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [nom_mp, descrip_mp, idproveedor];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertMateriaPrima;
