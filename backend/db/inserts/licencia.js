const pool = require('../pool');

async function insertarLicencia({idUsuario, fechaInicio, fechaFin}) {
  const query = `
    INSERT INTO Licencia (IDUsuario, Fecha_Inicio, Fecha_Fin)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [idUsuario, fechaInicio, fechaFin];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

module.exports = insertarLicencia;
