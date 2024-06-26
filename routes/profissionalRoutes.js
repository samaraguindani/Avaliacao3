const express = require('express');
const router = express.Router();
const profissionalController = require('../controller/profissionalController');

router.get('/', profissionalController.getAll);
router.get('/:id', profissionalController.getOne);

module.exports = router;
