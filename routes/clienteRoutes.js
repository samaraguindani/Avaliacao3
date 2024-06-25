const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.post('/cadastro', clienteController.create);
router.post('/login', clienteController.loginCliente);
router.get('/perfil', clienteController.getCliente);
router.post('/perfil', clienteController.update);
router.post('/perfil/delete', clienteController.delete);

module.exports = router;
