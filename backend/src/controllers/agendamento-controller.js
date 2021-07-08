const agendamentoModels = require('../models/agendamento-model');
const mongoDb = require('../infra/mongo');

exports.novoAgendamento = (req, res) => {

    agendamentoModels.find((err, agendamento) => {
        
        if (err) {
            res.json({
                
                status: "erro",
                message: "Não foi possivel recuperar agendamentos"
            })
        }
        /*
        */
        for (let i = 0; i < agendamento.length; i++) {
            if (req.body.pessoa_id == agendamento[i].pessoa_id) {
                res.json({
                    status: "erro",
                    message: `Pessoa de id:${agendamento[i].pessoa_id} já está cadastrada!`
                })
                return;
            }
        }


        let newAgendamento = new agendamentoModels();
        newAgendamento.unidade_id = req.body.unidade_id
        newAgendamento.pessoa_id = req.body.pessoa_id;
        newAgendamento.obs_agendamento = req.body.obs_agendamento;
        newAgendamento.necess_especiais = req.body.necess_especiais;
        newAgendamento.data_hora_agendamento =  Date.now();
        newAgendamento.save((erro) => {

            if (erro) {
                console.log(erro)
                res.json({
                    status: "erro",
                    message: "Não foi possivel agendar vacina!"
                })

            } else {
                console.log("Agendamento efetuado com sucesso!")
                res.json({
                    status: "Ok",
                    message: "Agendamento efetuado com sucesso!"
                })
            }
        })
    })
}

exports.mostarAgenda = (req, res) => {

    agendamentoModels.find(function (err, agendamento) {
        if (err || !agendamento) {
            console.log("Não foi possivel recuperar agenda!")
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar agenda!"
            })
        } else {
            res.json({
                status: "ok",
                agendamento: agendamento
            })
        }
    })

}

exports.deletarAgendamento = (req, res) => {
    let id_agenda = req.params.id;

    agendamentoModels.remove({
        _id: id_agenda

    }, (err) => {
        if (err) {
            res.json({
                status: "erro",
                message: "Erro ao deletar agendamento"
            })
        } else {
            res.json({
                status: "Ok",
                message: `Agendamento de id: ${id_agenda} deletado com sucesso`
            })

        }
    })
}