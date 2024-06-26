const pool = require('../db');

class Profissional {
  static async getAll() {
    const query = 'SELECT * FROM profissional';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM profissional WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = Profissional;
