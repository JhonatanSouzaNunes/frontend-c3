let router = require('express').Router();

const unidadeController = require('../controllers/unidades-controllers-pg');

router.post('/',unidadeController.adicionarUnidade);

 router.get('/',unidadeController.listarUnidades);

router.get('/:id',unidadeController.burscarUnidade);

router.put('/:id',unidadeController.atualizarUnidade);

router.delete('/:id',unidadeController.deletarUnidade);

module.exports = router;