const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Visitantes = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
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
const MoradoresSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    nomeProprietario: {
        type: String,
        required: true
    },
    torre: {
        type: Number,
        required: true,
        min: 1,
        max: 18
    },
    apartamento: {
        type: Number,
        required: true,
        min: 11,
        max: 54
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    eMorador: {
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    visitas: [Visitantes]

})

const moradoresModel = mongoose.model('moradores', MoradoresSchema)

module.exports = moradoresModel