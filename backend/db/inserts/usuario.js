/*const pool = require('../pool');

async function insertarUsuario({ correo, nombre, clave, celular, idPais }) {
  const query = `
    INSERT INTO Usuario (Correo, Nombre, Clave, Celular, IDPais)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
  const values = [correo, nombre, clave, celular, idPais];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarUsuario;*/

const pool = require('../pool');

// ✅ Inserta un usuario completo
async function insertarUsuario({ correo, nombre, clave = null, tipo_usuario = 'manual', celular = null, idPais = null }) {
  const query = `
    INSERT INTO Usuario (Correo, Nombre, Clave, Tipo_Usuario, Celular, IDPais)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [correo, nombre, clave, tipo_usuario, celular, idPais];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarUsuario;
