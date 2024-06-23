const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getOne);
router.post('/cadastro', clienteController.create);
router.put('/:id', clienteController.updateOne);
router.delete('/:id', clienteController.deleteOne);

module.exports = router;
