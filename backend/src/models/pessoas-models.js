const mongoose = require('mongoose');

const pessoasSchema = mongoose.Schema({

    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    data_nascimento_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    endereco_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    email_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    }

})

module.exports = mongoose.model('pessoas', pessoasSchema);