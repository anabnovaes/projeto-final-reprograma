const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VisitanteSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    nomeVisitante: {
        type: String,
        required: true
    },
    rg: {
        type: Number,
        required: true
    },
    dataEntrada: {
        type: Date,
        required: true,
        default: Date.now
    },
    saidaMorador: {
        type: Date,
        default: null,
    }

})


module.exports = {VisitanteSchema}