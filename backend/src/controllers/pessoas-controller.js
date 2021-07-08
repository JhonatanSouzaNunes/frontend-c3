const pessoasModel = require('../models/pessoas-models');
const mongoDb = require('../infra/mongo');

exports.adicionarPessoas = (req, res) => {

    pessoasModel.find((err, pessoas) => {


        if (err) {
            console.log("Não foi possivel recuperar pessoas cadastradas!")
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar pessoas cadastradas!"
            })
        }
        for (let i = 0; i < pessoas.length; i++) {
            if (req.body.cpf_pessoa == pessoas[i].cpf_pessoa) {
                res.json({
                    status: "erro",
                    message: " CPF já cadastrado"
                })
                return;
            }
            if (req.body.email_pessoa == pessoas[i].email_pessoa) {
                res.json({
                    status: "erro",
                    message: " email já cadastrado"
                })
                return;
            }
        }

        let pessoaNew = new pessoasModel();
        pessoaNew.grupo_prioritario = req.body.grupo_prioritario
        pessoaNew.nome_pessoa = req.body.nome_pessoa;
        pessoaNew.cpf_pessoa = req.body.cpf_pessoa;
        pessoaNew.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
        pessoaNew.telefone_pessoa = req.body.telefone_pessoa;
        pessoaNew.endereco_pessoa = req.body.endereco_pessoa;
        pessoaNew.email_pessoa = req.body.email_pessoa;
        pessoaNew.save((erro) => {
            if (erro) {
                console.log(erro)
                res.json({
                    status: "erro",
                    message: "Não foi possivel cadastar pessoa!"
                })

            } else {
                console.log("Pessoa inserida com sucesso!")
                res.json({
                    status: "Ok",
                    message: "Pessoa inserida com sucesso!"
                })
            }
        })
    })
}

exports.mostrarPessoaPorID = (req, res) => {
    let id_pessoa = req.params.id;
    pessoasModel.findById(id_pessoa, (err, pessoas) => {
        if (err || !pessoas) {
            res.json({
                status: "erro",
                message: `Nào foi possivel encontra pessoa com id: ${id_pessoa}`
            })
        } else {
            res.json({
                status: "Ok",
                pessoas: pessoas
            })
        }
    })
};


exports.listarPessoas = (req, res) => {

    pessoasModel.find(function (err, pessoas) {
        if (err || !pessoas) {
            console.log("Não foi possivel recuperar as pessoas cadastradas!")
            res.json({
                status: "erro",
                message: "Não foi possivel recuperar as pessoas cadastradas!"
            })
        } else {
            res.json({
                status: "ok",
                pessoas: pessoas
            })
        }
    })

}

exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;
    pessoasModel.findById(id_pessoa, (err, pessoas) => {
        if (err || !pessoas) {
            res.json({
                status: "erro",
                message: `Nào foi possivel encontra pessoa com id: ${id_pessoa}`
            })
        } else {
            pessoas.grupo_prioritario = req.body.grupo_prioritario
            pessoas.nome_pessoa = req.body.nome_pessoa;
            pessoas.cpf_pessoa = req.body.cpf_pessoa;
            pessoas.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
            pessoas.telefone_pessoa = req.body.telefone_pessoa;
            pessoas.endereco_pessoa = req.body.endereco_pessoa;
            pessoas.email_pessoa = req.body.email_pessoa;
            pessoas.save(erro => {
                if (erro) {
                    res.json({
                        status: "erro",
                        message: `Nào foi possivel encontra pessoa com id: ${id_pessoa}`
                    })
                } else {
                    res.json({
                        status: "Ok",
                        message: `Cadastro de ${pessoas.nome_pessoa} atualizado com sucesso`
                    })
                }
            })
        }
    })

}

exports.deletarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa

    }, (err) => {
        if (err) {
            res.json({
                status: "erro",
                message: "Erro ao deletar pessoa"
            })
        } else {
            res.json({
                status: "Ok",
                message: `cadastro de id: ${id_pessoa} deletado com sucesso`
            })

        }
    })
}