const Sequelize = require('sequelize').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const unidadesModels = postgres.define('unidade',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    descricao_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    endereco_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    telefone_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    email_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    },
    latlong_unidade: {
        type: Sequelize.STRING,
        allowNull: false, 
    }
});

module.exports = unidadesModels;