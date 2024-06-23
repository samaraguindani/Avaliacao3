const Cliente = require('../model/cliente');

exports.getAll = async (req, res) => {
  try {
    const clientes = await Cliente.getAll();
    res.status(200).json({
      status: 'success',
      data: {
        clientes
      }
    });
  } catch (err) {
    console.error('Erro ao buscar todos os clientes:', err);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar todos os clientes'
    });
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return res.status(404).json({
        status: 'error',
        message: 'Cliente não encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        cliente
      }
    });
  } catch (err) {
    console.error(`Erro ao buscar cliente com id ${id}:`, err);
    res.status(500).json({
      status: 'error',
      message: `Erro ao buscar cliente com id ${id}`
    });
  }
};

exports.createOne = async (req, res) => {
  const { nome, email } = req.body;
  try {
    const novoCliente = await Cliente.create(nome, email);
    res.status(201).json({
      status: 'success',
      data: {
        cliente: novoCliente
      }
    });
  } catch (err) {
    console.error('Erro ao criar novo cliente:', err);
    res.status(400).json({
      status: 'error',
      message: 'Erro ao criar novo cliente'
    });
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;
  const { nome, email } = req.body;
  try {
    const clienteAtualizado = await Cliente.update(id, nome, email);
    if (!clienteAtualizado) {
      return res.status(404).json({
        status: 'error',
        message: 'Cliente não encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        cliente: clienteAtualizado
      }
    });
  } catch (err) {
    console.error(`Erro ao atualizar cliente com id ${id}:`, err);
    res.status(400).json({
      status: 'error',
      message: `Erro ao atualizar cliente com id ${id}`
    });
  }
};

exports.deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    await Cliente.delete(id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error(`Erro ao excluir cliente com id ${id}:`, err);
    res.status(500).json({
      status: 'error',
      message: `Erro ao excluir cliente com id ${id}`
    });
  }
};
