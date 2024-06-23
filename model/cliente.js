const pool = require('../db');

class Cliente {
  static async getAll() {
    const query = 'SELECT * FROM cliente';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM cliente WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(nome, email) {
    const query = 'INSERT INTO cliente (nome, email) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [nome, email]);
    return rows[0];
  }

  static async update(id, nome, email) {
    const query = 'UPDATE cliente SET nome = $1, email = $2 WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [nome, email, id]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM cliente WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = Cliente;
