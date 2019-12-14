const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminsSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
    },
    tipoLogin: {
        type: String,
        required: true
    }

})


const adminsModel = mongoose.model('admins', AdminsSchema)

    module.exports = {adminsModel, AdminsSchema}