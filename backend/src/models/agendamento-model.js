const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({

    unidade_id: [
        { type: mongoose.Schema.Types.ObjectId,
             ref: 'unidades' }
    ],
    pessoa_id: [
        { type: mongoose.Schema.Types.ObjectId, 
            ref: 'pessoas' }
    ],

    obs_agendamento: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    necess_especiais: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },

    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }

})
module.exports = mongoose.model('agendamentos', agendamentoSchema);