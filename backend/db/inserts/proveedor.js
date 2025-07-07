const pool = require('../pool');

async function insertarProveedor({ nom_proveedor, idPais }) {
  const query = `
    INSERT INTO proveedor (nom_proveedor, idpais)
    VALUES ($1, $2)
  `;
  const values = [nom_proveedor, idPais];
  await pool.query(query, values);
}

module.exports = insertarProveedor;