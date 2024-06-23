const express = require('express');
const router = express.Router();
const profissionalController = require('../controller/profissionalController');

router.get('/', profissionalController.getAll);
router.get('/:id', profissionalController.getOne);
router.post('/', profissionalController.createOne);
router.put('/:id', profissionalController.updateOne);
router.delete('/:id', profissionalController.deleteOne);

module.exports = router;
