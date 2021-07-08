const unidadesModel = require('../models/unidades-models');
const mongoDb = require('../infra/mongo');

exports.adicionarUnidade = (req, res) => {

    unidadesModel.find((err, unidades) => {

        if (err) {
            console.log("Não foi possivel recuperar unidades cadastradas!")
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar unidades cadastradas!"
            })
            return;
        }

        for (let i = 0; i < unidades.length; i++) {

            if (req.body.email_unidade == unidades[i].email_unidade) {
                res.json({
                    status: "erro",
                    message: " email já cadastrado"
                })
                return;
            }
        }

        let unidadesNew = new unidadesModel();

        unidadesNew.nome_unidade = req.body.nome_unidade
        unidadesNew.descricao_unidade = req.body.descricao_unidade;
        unidadesNew.endereco_unidade = req.body.endereco_unidade;
        unidadesNew.telefone_unidade = req.body.telefone_unidade;
        unidadesNew.email_unidade = req.body.email_unidade;
        unidadesNew.latlong_unidade = req.body.latlong_unidade;
        unidadesNew.save((erro) => {

            if (erro) {
                console.log(erro)
                res.json({
                    status: "erro",
                    message: "Não foi possivel cadastar unidade!"
                })

            } else {
                console.log("Unidade inserida com sucesso!")
                res.json({
                    status: "Ok",
                    message: "Unidade inserida com sucesso!"
                })
            }
        })
    })
}

//  MOSTRAR UM UNIDADE
exports.mostrarUnidadePorID = (req, res) => {

    let id_unidade = req.params.id;

    unidadesModel.findById(id_unidade, (err, unidades) => {

        if (err || !unidades) {
            res.json({
                status: "erro",
                message: `Nào foi possivel encontra unidade com id: ${id_unidade}`
            })

        } else {
            res.json({
                status: "Ok",
                unidades: unidades
            })
        }
    })
};

// MOSTRAR TODAS AS UNIDADES
exports.listarUnidades = (req, res) => {

    unidadesModel.find(function (err, unidades) {

        if (err || !unidades) {
            console.log("Não foi possivel recuperar as unidades cadastradas!")
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar as unidades cadastradas!"
            })

        } else {
            res.json({
                status: "ok",
                unidades: unidades
            })
        }
    })
}

exports.atualizarUnidade = (req, res) => {
    let id_unidade = req.params.id;
    unidadesModel.findById(id_unidade, (err, unidades) => {
        if (err || !unidades) {
            res.json({
                status: "erro",
                message: `Nào foi possivel encontra unidade com id: ${id_unidade}`
            })
        } else {
            unidades.nome_unidade = req.body.nome_unidade
            unidades.descricao_unidade = req.body.descricao_unidade;
            unidades.endereco_unidade = req.body.endereco_unidade;
            unidades.telefone_unidade = req.body.telefone_unidade;
            unidades.email_unidade = req.body.email_unidade;
            unidades.latlong_unidade = req.body.latlong_unidade;
            unidades.save(erro => {
                if (erro) {
                    res.json({
                        status: "erro",
                        message: `Nào foi possivel encontra unidade com id: ${id_unidade}`
                    })
                } else {
                    res.json({
                        status: "Ok",
                        message: `Cadastro de ${unidades.nome_unidade} atualizado com sucesso`
                    })
                }
            })
        }
    })

}

exports.deletarUnidade = (req, res) => {
    let id_unidade = req.params.id;

    pessoasModel.remove({
        _id: id_unidade

    }, (err) => {
        if (err) {
            res.json({
                status: "erro",
                message: "Erro ao deletar unidade"
            })
        } else {
            res.json({
                status: "Ok",
                message: `cadastro de id: ${id_unidade} deletado com sucesso`
            })

        }
    })
}
