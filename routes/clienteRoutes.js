const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getOne);
router.post('/cadastro', clienteController.create);
router.post('/login', clienteController.loginCliente);
router.put('/:id', clienteController.updateOne);
router.delete('/:id', clienteController.deleteOne);

module.exports = router;
