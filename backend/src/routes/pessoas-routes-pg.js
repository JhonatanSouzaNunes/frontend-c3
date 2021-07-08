let router = require('express').Router();

const pessoaControllers = require('../controllers/pessoas-controller-pg');

router.post('/',pessoaControllers.adicionarPessoa);

router.get('/',pessoaControllers.listarPessoas);

router.get('/:id',pessoaControllers.mostarPessoa);

router.put('/:id',pessoaControllers.atualizarPessoaPg);

router.delete('/:id',pessoaControllers.deletarPessoa);

module.exports = router;