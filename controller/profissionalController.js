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
