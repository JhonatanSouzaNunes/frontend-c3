let router = require('express').Router();

const unidadesControllers = require('../controllers/unidades-controllers');


router.post('/',unidadesControllers.adicionarUnidade);

router.get('/',unidadesControllers.listarUnidades);

router.put('/',unidadesControllers.atualizarUnidade);

router.get('/:id',unidadesControllers.mostrarUnidadePorID);

router.delete('/:id', unidadesControllers.deletarUnidade)

module.exports = router;