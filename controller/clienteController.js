const Cliente = require('../model/cliente');

exports.getCliente = async (req, res) => {
  try {
    if (!req.session.clienteId) {
      return res.redirect('/clientes/login');
    }

    const clienteId = req.session.clienteId;
    const cliente = await Cliente.getCliente(clienteId);

    if (!cliente) {
      return res.status(404).send('Cliente não encontrado.');
    }

    res.render('perfil', { cliente });
  } catch (error) {
      console.error('Erro ao carregar perfil do cliente:', error.message);
      res.status(500).send('Erro ao carregar perfil do cliente. <a href="/clientes/login">Tente novamente</a>');
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, cpf, endereco, email, data_nasc, senha } = req.body;
    await Cliente.create(nome, cpf, endereco, email, data_nasc, senha);
    res.redirect('/clientes/login');
  } catch (error) {
      console.error('Erro ao cadastrar cliente:', error.message);
      res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, cpf, endereco, email, data_nascimento } = req.body;
    const clienteId = req.session.clienteId;
    const clienteAtualizado = await Cliente.update(clienteId, nome, cpf, endereco, email, data_nascimento);

    if (!clienteAtualizado) {
      return res.status(404).send('Cliente não encontrado.');
    }

    res.redirect('/clientes/perfil');
  } catch (err) {
    console.error(`Erro ao atualizar cliente com id ${id}:`, err);
    res.status(400).json({ status: 'error', message: `Erro ao atualizar cliente com id ${id}` });
  }
};

exports.delete = async (req, res) => {
  try {
    const clienteId = req.session.clienteId;
    const clienteDeletado = await Cliente.delete(clienteId);

    if (!clienteDeletado) {
      return res.status(404).send('Cliente não encontrado.');
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Erro ao deletar cliente. <a href="/clientes/perfil">Tente novamente</a>');
      }

      res.redirect('/clientes/login');
    });
  } catch (err) {
    console.error(`Erro ao excluir cliente com id ${id}:`, err);
    res.status(500).json({ status: 'error', message: `Erro ao excluir cliente com id ${id}` });
  }
};

exports.loginCliente = async (req, res) => {
  try {
    const { cpf, email, senha } = req.body;

    const clientes = await Cliente.autenticar(cpf, email, senha);

    if (clientes.length > 0) {
      const cliente = clientes[0];
      req.session.clienteId = cliente.id;

      console.log("Login bem-sucedido para o cliente:", cliente.nome);
      return res.redirect('/profissionais');
    } else {
      console.log("Tentativa de login com credenciais incorretas:", { cpf, email });
      res.status(401).send('Credenciais incorretas. <a href="/clientes/login">Tente novamente</a>');
    } res.status(401).send('Credenciais incorretas. <a href="/clientes/login">Tente novamente</a>');
  } catch (error) {
    console.error('Erro ao autenticar cliente:', error.message);
    res.status(500).send('Erro ao autenticar cliente. <a href="/clientes/login">Tente novamente</a>');
  }
};

