const pool = require('../db');

class Profissional {
  //usado
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

  static async create(nome, especialidade) {
    const query = 'INSERT INTO profissional (nome, especialidade) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [nome, especialidade]);
    return rows[0];
  }

  static async update(id, nome, especialidade) {
    const query = 'UPDATE profissional SET nome = $1, especialidade = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [nome, especialidade, id]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM profissional WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Profissional;
