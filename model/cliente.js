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

  //usado
  static async create(nome, cpf, endereco, email, data_nasc, senha) {
    const query = `
        INSERT INTO cliente (nome, cpf, endereco, email, data_nascimento, senha)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
    const values = [nome, cpf, endereco, email, data_nasc, senha];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
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

  //usado
  static async autenticar(cpf, email, senha) {
    const query = 'SELECT * FROM cliente WHERE cpf = $1 AND email = $2 AND senha = $3';
    const values = [cpf, email, senha];

    try {
      const { rows } = await pool.query(query, values);
      return rows; 
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Cliente;
