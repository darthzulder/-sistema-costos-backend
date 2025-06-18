const pool = require('../pool');

async function insertProducto({idempresa, nom_producto, descrip_producto, lote, merma}) {
  const query = `
    INSERT INTO Producto (idempresa, nom_producto, descrip_producto, lote, merma)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [idempresa, nom_producto, descrip_producto, lote, merma];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertProducto;

