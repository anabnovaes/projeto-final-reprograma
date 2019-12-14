const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const visitante = require('../model/visitantesSchema')
const ProprietariosSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
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
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    moradores:{
        type: String  
    },
    telefone: {
        type: Number
    },
    token: {
        type: String,
        required: true
    }
});

ProprietariosSchema.add({
    visita : [visitante]
})


const moradoresModel = mongoose.model('moradores', ProprietariosSchema)

module.exports = {moradoresModel, ProprietariosSchema}