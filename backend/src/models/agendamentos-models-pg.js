const Sequelize = require('sequelize').Sequelize;
const postgres = require('../infra/postgres').sequelize;
const pessoaModel = require('../models/pessoas-model-pg');
const unidadeModel = require('../models/unidades-models-pg');

const agendaModels = postgres.define('agenda', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    cpf_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_pessoa: {
        type: Sequelize.STRING,
        allowNull: true
    },
    obs_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    },

    necess_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },

    data_hora_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = agendaModels;