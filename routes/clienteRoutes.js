const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteController');

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getOne);
router.post('/', clienteController.createOne);
router.put('/:id', clienteController.updateOne);
router.delete('/:id', clienteController.deleteOne);

module.exports = router;
