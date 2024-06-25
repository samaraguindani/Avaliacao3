const pool = require('../db');

class Cliente {
  static async getCliente(clienteId) {
    const query = 'SELECT * FROM cliente WHERE id = $1';
    const values = [clienteId];
  
    try {
        const { rows } = await pool.query(query, values);
  
        if (rows.length > 0) {
            return rows[0]; 
        } else {
            return null; 
        }
    } catch (error) {
        throw error;
    }
  }

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

  static async update(id, nome, cpf, endereco, email, data_nascimento) {
    const query = 'UPDATE cliente SET nome = $1, cpf = $2, endereco = $3, email = $4, data_nascimento = $5 WHERE id = $6 RETURNING *';
    const values = [nome, cpf, endereco, email, data_nascimento, id];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0]; 
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM cliente WHERE id = $1';
    const { rowCount } = await pool.query(query, [id]);
    return rowCount > 0;
  }

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
