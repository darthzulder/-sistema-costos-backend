const pool = require('../pool');

async function insertRecetaMP({idreceta, idmp, cantidad, precio, fecha_cotizacion, version}) {
  const query = `
    INSERT INTO Receta_MP (IDReceta, IDMP, Cantidad, Precio, Fecha_Cotizacion, Version)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [idreceta, idmp, cantidad, precio, fecha_cotizacion, version];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertRecetaMP;


