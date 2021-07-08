let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller');

router.get('/', pessoasController.listarPessoas);

router.post('/',pessoasController.adicionarPessoas);

router.get('/:id',pessoasController.mostrarPessoaPorID);

router.put('/:id',pessoasController.atualizarPessoa);

router.delete('/:id',pessoasController.deletarPessoa);

module.exports = router;