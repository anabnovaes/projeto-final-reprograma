//bibliotecas instaladas no projeto
const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const bancoDeDados = require('./model/database')
const app = express()

// instanciando o banco de dados
bancoDeDados()

// iniciando o bodyparser em todas as rotas
app.use(bodyParser.json())

