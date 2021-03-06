//bibliotecas instaladas no projeto
const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const moradores = require('./routes/moradoresRoutes')
const vigilantes = require('./routes/vigilantesRoutes')
const admin = require('./routes/adminRoutes')
const bancoDeDados = require('./model/database')
const app = express()

// instanciando o banco de dados
bancoDeDados()

// iniciando o bodyparser em todas as rotas
app.use(bodyParser.json())

// usando as rotas
app.use('/', index)
app.use('/admin', admin)
app.use('/moradores', moradores)
app.use('/vigilantes', vigilantes)

module.exports = app
