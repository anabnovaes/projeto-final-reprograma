const bcrypt = require('bcryptjs');
const options = { new: true }
const jwt = require('jsonwebtoken')
const SEGREDO = process.env.SEGREDO 
const {moradoresModel} = require('../model/moradoresSchema')

// inicializando as rotas
const login = async (request, response) => {
  const moradorEncontrado = await adminsModel.findOne({ email: request.body.email })

  if (moradorEncontrado) {
    const senhaCorreta = bcrypt.compareSync(request.body.senha, moradorEncontrado.senha)

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          grupo: moradorEncontrado.tipoLogin,
          id: moradorEncontrado.id
        },
        SEGREDO,
        { expiresIn: 6000000 }
      )

      return response.status(200).send({ token })
    }

    return response.status(401).send('E-mail ou senha incorreta.')
  }

  return response.status(404).send('Administrador não encontrado.')
}


const getMoradorById = (request, response ) =>{
  const idMorador = request.params.id
   moradoresModel.findById(idMorador, (error, morador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (morador) {
      return response.status(200).send(morador)
    }

    return response.status(404).send('Morador não encontrado.')
  })
  

}
const getVisitas = (request, response) =>{
  const idMorador = request.params.id
  moradoresModel.findById(idMorador, (error, morador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (morador) {
      return response.status(200).send(morador.visitas)
    }

    return response.status(404).send('Morador não encontrado.')
  })
}

const updateMorador = (request, response) =>{
  const moradorId = request.params.vigilanteId
  const options = { new: true }
  const senhaUsuario = request.body.senha
  

if (senhaUsuario){
  senhaCriptografada = bcrypt.hashSync(senhaUsuario)

}

  moradoresModel.findByIdAndUpdate(
    moradorId,{
      $set: {
        'nome': request.body.nome,
        'login': request.body.login,
        'senha': senhaCriptografada
      }},options,
    (error, morador) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (morador) {
        return response.status(200).send(morador)
      }

      return response.status(404).send('Vigilante não encontrado.')
    }
  )

}

  module.exports = {
    getMoradorById,
    getVisitas,
    login,
    updateMorador
  }