let router = require('express').Router();

const agendamento = require('../controllers/agendamento-controller');

router.post('/',agendamento.novoAgendamento);

router.get('/',agendamento.mostarAgenda);

router.delete('/:id',agendamento.deletarAgendamento);


module.exports = router;


