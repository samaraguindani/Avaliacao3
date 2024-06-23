const Profissional = require('../model/profissional');

exports.getAll = async (req, res) => {
  try {
    const profissionais = await Profissional.getAll();
    res.render('index', { profissionais });
  } catch (err) {
    console.error('Erro ao buscar todos os profissionais:', err);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao buscar todos os profissionais'
    });
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const profissional = await Profissional.getById(id);
    if (!profissional) {
      return res.status(404).json({ status: 'error', message: `Profissional com id ${id} não encontrado.` });
    }
    res.render('profissional', { profissional });
  } catch (err) {
    console.error(`Erro ao buscar profissional com id ${id}:`, err);
    res.status(500).json({
      status: 'error',
      message: `Erro ao buscar profissional com id ${id}`
    });
  }
};

exports.createOne = async (req, res) => {
  const { nome, especialidade } = req.body;
  try {
    const novoProfissional = await Profissional.create(nome, especialidade);
    res.status(201).json({
      status: 'success',
      data: {
        profissional: novoProfissional
      }
    });
  } catch (err) {
    console.error('Erro ao criar novo profissional:', err);
    res.status(400).json({
      status: 'error',
      message: 'Erro ao criar novo profissional'
    });
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;
  const { nome, especialidade } = req.body;
  try {
    const profissionalAtualizado = await Profissional.update(id, nome, especialidade);
    if (!profissionalAtualizado) {
      return res.status(404).json({
        status: 'error',
        message: 'Profissional não encontrado'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        profissional: profissionalAtualizado
      }
    });
  } catch (err) {
    console.error(`Erro ao atualizar profissional com id ${id}:`, err);
    res.status(400).json({
      status: 'error',
      message: `Erro ao atualizar profissional com id ${id}`
    });
  }
};

exports.deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    await Profissional.delete(id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    console.error(`Erro ao excluir profissional com id ${id}:`, err);
    res.status(500).json({
      status: 'error',
      message: `Erro ao excluir profissional com id ${id}`
    });
  }
};
