const { moradoresModel } = require("../model/moradoresSchema");
const bcrypt = require("bcryptjs");
const options = { new: true }
const jwt = require("jsonwebtoken")
const SEGREDO = process.env.SEGREDO 

const gerarCriptografias = (dadosUsuario) => {
    const senhaCriptografada = bcrypt.hashSync(dadosUsuario.senha)
    dadosUsuario.senha = senhaCriptografada
    const token = jwt.sign(
      {
        email: dadosUsuario.email
      },
      SEGREDO
    )
    dadosUsuario.token = bcrypt.hashSync(token)
    return dadosUsuario
  
  }

const add = async (request, response) => {
    const dadosRequisicao = request.body
    const verificarCadastro = await usuariosModel.findOne({email: request.body.email})
    if(verificarCadastro){
      return response.status(401).json({erro: "Email já existente!"})
    }
    const usuarioCriptografado = gerarCriptografias(dadosRequisicao)
    const novoMorador = new moradoresModel(usuarioCriptografado);
    novoMorador.save((error) => {
      if (error) {
        return response.status(500).json({ erro : error })
      }
  
      return response.status(201).json(novoMorador)
    })
  }


  module.exports = {
      add,

  }