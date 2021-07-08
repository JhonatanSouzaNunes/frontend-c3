const agendaModels = require('../models/agendamentos-models-pg');
const pessoasModels = require('../models/pessoas-model-pg');

exports.adicionarAgenda = async (req, res) => {
    try {

        const pessoa = await pessoasModels.findAll()
        for (let i = 0; i < pessoa.length; i++) {

            const agenda = req.body;

            if (agenda.cpf_pessoa == pessoa[i].cpf_pessoa) {

                const agendamento = await agendaModels.create({
                    cpf_pessoa: agenda.cpf_pessoa,
                    nome_pessoa: pessoa[i].nome_pessoa,
                    obs_agendamento: agenda.obs_agendamento,
                    necess_especiais: agenda.necess_especiais,
                    data_hora_agendamento: agenda.data_hora_agendamento
                })
                if (agendamento) {
                    res.json({
                        status: 'OK',
                        message: agendamento
                    })
                }
            } else {
                res.json({
                    status: 'Erro',
                    message: "Informe um cpf cadastrado para realizar o agendamendo! exemplo: 111.111.111-11"
                })
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.listarAgenda = async (req, res) => {

    try {


        const listarAgenda = await agendaModels.findAll();
        res.json({
            status: "Ok",
            message: "Agenda recuperada",
            agenda: listarAgenda
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: "Ok",
            message: "Nao foi possivel recuperar agenda"
        })
    }
}

exports.mostarAgendamento = async (req, res) => {
    try {
        let id_agenda = req.params.id

        const buscarAgenda = await agendaModels.findByPk(id_agenda);

        if (buscarAgenda) {

            res.json({
                status: "Ok",
                message: "Agendamento recuperado!",
                agenda: buscarAgenda
            })
        } else {
            res.json({
                status: "erro",
                message: `Nao existe agendamento com id: ${id_agenda}`
            })
        }

    } catch (error) {
        res.json({
            status: "Erro",
            message: "Nao foi possivel recuperar agendamento!"
        })
    }

}

exports.atualizarAgenda = async (req, res) => {
    try {
        let id_agenda = req.params.id;
        let agendas = req.body
        let novaAgenda = {
            obs_agendamento: agendas.obs_agendamento,
            necess_especiais: agendas.necess_especiais,
            data_hora_agendamento: Date()

        }
        const atualizarAgen = await agendaModels.update(novaAgenda, { where: { id: id_agenda } })

        if (atualizarAgen) {
            res.json({
                status: "Ok",
                message: "Agenda atualizada com sucesso",
                agenda: novaAgenda
            })
        } else {
            res.json({
                status: "err",
                message: `Agenda de id: ${id_agenda}`
            })
        }
    } catch (error) {
        res.json({
            status: "erro",
            message: "Nao foi possivel atualizar agenda"
        })
    }

}

exports.deletarAgendamento = async (req, res) => {
    try {
        let id_agenda = req.params.id;
        const deletarAgenda = await agendaModels.destroy({ where: { id: id_agenda } })

        if (deletarAgenda) {
            res.json({
                status: "Ok",
                message: "Agendamento cancelado com sucesso"
            })
        } else {
            res.json({
                status: "erro",
                message: "Erro ao deletar agenda"
            })
        }

    } catch (error) {
        res.json({

            status: "erro",
            message: "Não foi possivel deletar agendamento"
        })
    }

}
