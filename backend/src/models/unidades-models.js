const  mongoose  = require("mongoose");

const unidadesSchema = mongoose.Schema({

    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    },

    descricao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    },

    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    },

    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        required: true 
    }

})

module.exports = mongoose.model('unidades',unidadesSchema);