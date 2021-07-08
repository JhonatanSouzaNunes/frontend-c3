let router = require('express').Router();
const agendaControllers = require('../controllers/agendamento-controllers-pg');

router.post('/', agendaControllers.adicionarAgenda);

router.get('/', agendaControllers.listarAgenda);

router.get('/:id', agendaControllers.mostarAgendamento);

router.put('/:id',agendaControllers.atualizarAgenda);

router.delete('/:id',agendaControllers.deletarAgendamento);

module.exports = router;