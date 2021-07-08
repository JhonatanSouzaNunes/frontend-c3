const Sequelize = require('sequelize').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const pessoasModels = postgres.define('pessoa', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    data_nascimento_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    telefone_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    },
 
    grupo_prioritario: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },

    endereco_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


module.exports = pessoasModels;