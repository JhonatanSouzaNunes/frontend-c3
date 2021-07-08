const pessoasModels = require('../models/pessoas-model-pg');

exports.adicionarPessoa = async (req, res) => {

    const pessoa = req.body;

    console.log(pessoa)

    const pessoaExiste = await pessoasModels.findAll({
        where: {
            email_pessoa: pessoa.email_pessoa,
            cpf_pessoa: pessoa.cpf_pessoa
        }
    });

    if (pessoaExiste.length > 0) {
        if (pessoa.email_pessoa) {
            res.json({
                status: 'erro',
                message: "Esse email já existe"
            })
        } else {
            res.json({
                status: 'erro',
                message: "Esse cpf já está cadastrado"
            })
        }
        return;
    }

    const inserirPessoa = await pessoasModels.create({
        nome_pessoa: pessoa.nome_pessoa,
        cpf_pessoa: pessoa.cpf_pessoa,
        data_nascimento_pessoa: pessoa.data_nascimento_pessoa,
        telefone_pessoa: pessoa.telefone_pessoa,
        grupo_prioritario: pessoa.grupo_prioritario,
        endereco_pessoa: pessoa.endereco_pessoa,
        email_pessoa: pessoa.email_pessoa,
    })
    res.json({
        status: 'OK',
        message: inserirPessoa
    })
}

exports.listarPessoas = async (req, res) => {
    try {
        const pessoas = await pessoasModels.findAll()
            res.json({
                status: "ok",
                pessoas: pessoas
            })

    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: "Erro ao buscar pessoas cadastradas"

        })

    }

}

exports.mostarPessoa = async (req, res) => {
    let id_pessoa = req.params.id;

    try {
        const buscarPessoa = await pessoasModels.findByPk(id_pessoa);
        if (buscarPessoa) {
            res.json({
                status: "ok",
                message: "Pessoa recuperada com sucesso",
                pessoas: buscarPessoa
            })
        } else {
            res.json({
                status: "ok",
                message: "Pessoa recuperada com sucesso",
            })
        }

    } catch (error) {
        res.json({
            status: "Erro",
            message: `Erro ao recuperar pessoa de id: ${id_pessoa}`
        })
    }

}

exports.atualizarPessoaPg = async (req, res) => {
    let id_pessoa = req.params.id;
    let pessoa = req.body;
    let novaPessoa = {
        nome_pessoa: pessoa.nome_pessoa,
        cpf_pessoa: pessoa.cpf_pessoa,
        data_nascimento_pessoa: pessoa.data_nascimento_pessoa,
        telefone_pessoa: pessoa.telefone_pessoa,
        grupo_prioritario: pessoa.grupo_prioritario,
        endereco_pessoa: pessoa.endereco_pessoa,
        email_pessoa: pessoa.email_pessoa,
    }

    if (id_pessoa) {

        let atualizarPessoa = await pessoasModels.update(novaPessoa, { where: { id: id_pessoa } })

        if (atualizarPessoa) {
            res.json({
                status: 'OK',
                message: `Pessoa de id: ${id_pessoa} atualizado com sucesso!`,
                novaPessoa: novaPessoa
            })
        } else {
            res.json({
                status: 'erro',
                message: `Erro ao atualizar pessoa!`
            })
        }

    } else {
        res.json({
            status: 'erro',
            message: `Insira um id valido para atualizar!`
        })

    }
}

exports.deletarPessoa = async (req, res) => {
    let id_pessoa = req.params.id;
    if (id_pessoa) {
        try {
            let deletarPessoa = await pessoasModels.destroy({ where: { id: id_pessoa } })
            if (deletarPessoa) {
                res.json({
                    status: 'ok',
                    message: `cadastro deletado com sucesso!`
                })
            } else {
                res.json({
                    status: 'ok',
                    message: `Nao foi pissivel deletar cadastro`
                })
            }


        } catch (error) {
            res.json({
                status: 'ok',
                message: `Nao foi pissivel deletar cadastro`
            })
        }


    } else {
        res.json({
            status: 'ok',
            message: `Nao foi pissivel deletar cadastro`
        })

    }

}