const unidadesModels = require('../models/unidades-models-pg');

exports.adicionarUnidade = async (req, res) => {
    try {
        const unidade = req.body;
        console.log(unidade)

        const unidadeExiste = await unidadesModels.findAll({
            where: {
                email_unidade: unidade.email_unidade,
            }
        });

        if (unidadeExiste.length > 0) {
            if (unidade.email_unidade) {
                res.json({
                    status: 'erro',
                    message: "Esse email já existe"
                })
            }
            return;
        }

        const inserirUnidade = await unidadesModels.create({
            nome_unidade: unidade.nome_unidade,
            descricao_unidade: unidade.descricao_unidade,
            endereco_unidade: unidade.endereco_unidade,
            telefone_unidade: unidade.telefone_unidade,
            email_unidade: unidade.email_unidade,
            latlong_unidade: unidade.latlong_unidade,
        })
        res.json({
            status: 'OK',
            message: inserirUnidade
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: "erro",
            message: "Nao foi possivel recuperar unidades cadastradas"
        })
    }
}

exports.listarUnidades = async (req, res) => {
    try {
        const listarUnidades = await unidadesModels.findAll();
        res.json({
            status: "OK",
            message: "Lista de unidades recuperada",
            unidades: listarUnidades
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: "erro",
            message: "Nao foi possivel recuperar unidades cadastradas"
        })
    }
}

exports.burscarUnidade = async (req, res) => {
    let id_unidade = req.params.id;
    try {

        const burscarUnidade = await unidadesModels.findByPk(id_unidade)

        if (burscarUnidade) {
            res.json({
                status: "OK",
                message: "Unidade recuperado com sucesso",
                unidade: burscarUnidade
            })
        } else {
            res.json({
                status: "erro",
                message: "Unidade nao existe",
            })
        }

    } catch (error) {
        console.log(error);
        res.json({
            status: "erro",
            message: "Nao foi possivel recuperar unidade",
        })
    }


}


exports.atualizarUnidade = async (req, res) => {
    try {
        let id_unidade = req.params.id;
        let unidade = req.body;
        let novaUnidade = {
            nome_unidade: unidade.nome_unidade,
            descricao_unidade: unidade.descricao_unidade,
            endereco_unidade: unidade.endereco_unidade,
            telefone_unidade: unidade.telefone_unidade,
            email_unidade: unidade.email_unidade,
            latlong_unidade: unidade.latlong_unidade,
        }
        if (id_unidade) {
            let atualizarUnidade = await unidadesModels.update(novaUnidade, { where: { id: id_unidade } })
            if (atualizarUnidade) {
                res.json({
                    status: "OK",
                    message: "Cadastro atualizado com sucesso!",
                    unidade: novaUnidade
                })
            }
        } else {
            res.json({
                status: "erro",
                message: "Erro ao atualizar cadastro na unidade!",
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "erro",
            message: "erro ao deletar unidade"
        })
    }

}


exports.deletarUnidade = async (req, res) => {
    try {
        let id_unidade = req.params.id;
        if (id_unidade) {
            let deletarUnidade = await unidadesModels.destroy({ where: { id: id_unidade } })
            if (deletarUnidade) {
                res.json({
                    status: "ok",
                    message: "Unidade deletada com sucesso!"
                })
            } else {
                res.json({
                    status: "erro",
                    message: "erro ao deletar unidade"
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: "erro",
            message: "erro ao deletar unidade"
        })
    }

}