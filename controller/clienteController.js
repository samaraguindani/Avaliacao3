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

//usado
exports.create = async (req, res) => {
  const { nome, cpf, endereco, email, data_nasc, senha } = req.body;
  
  try {
    await Cliente.create(nome, cpf, endereco, email, data_nasc, senha);
    res.redirect('/profissionais');
  } catch (error) {
      console.error('Erro ao cadastrar cliente:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
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

//usado
exports.loginCliente = async (req, res) => {
  try {
    const { cpf, email, senha } = req.body;

    const clientes = await Cliente.autenticar(cpf, email, senha);

    if (clientes.length > 0) {
        console.log("Login bem-sucedido para o cliente:", clientes[0].nome);
        res.redirect('/profissionais');
    } else {
        console.log("Tentativa de login com credenciais incorretas:", { cpf, email });
        res.status(401).send('Credenciais incorretas. <a href="/clientes/login">Tente novamente</a>');
    }
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error.message);
    res.status(500).send('Erro ao autenticar cliente. <a href="/clientes/login">Tente novamente</a>');
  }
};

