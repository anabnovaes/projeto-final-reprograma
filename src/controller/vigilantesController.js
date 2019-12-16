const {moradoresModel}  = require('../model/moradoresSchema');
const {visitantesModel} = require('../model/visitantesSchema')
const {adminsModel} = require('../model/adminsSchema')
const bcrypt = require('bcryptjs');
const options = { new: true }
const jwt = require('jsonwebtoken')
const SEGREDO = process.env.SEGREDO || 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAM0546KHReasmp74l9YctYjNx2aduJFhJMBRei6eIE9jVQeLoU667G7MeOYA2TxDlv6Qwx9eg6nS1bMP7FLbiG9MhW2qDIfAwbxrV1cadu0G/52RP8Fp9enD2ryF0zHHwQo5cK6E+vQbTIFK4NFR5zLPaOZciw/FdfAVWgotZYjXAgMBAAECgYEAxSgH9+vcy26mXHKV66xI+dQ26+45kfCxTdD4gDCI+buDxGvv26LX4Nmui8fk6nBEburDiS9TbaKOiieR8UfWGN3vkvj3XU7pbRUhGVtPbU3HCxUPGmh3oPoWRfyiry+ageQKfc9eHqWN+MFjgklNpjj4sbr7lyL13dPREAUIkwECQQDrC5VcLCqDQxGlwc4WLJBUs6edhJvpq/CCWl0rAN9U+JopMMWEbMbxN7h9/y4zOnG7VdjqJnPrdNcRYHbeHZHZAkEA34W/KEvg00tJxwXUf2hy08iTBBWDWQ0bVr7kYocysPAufeK9ok3Xy18mz3+2EH4cMlSWLp1D1cmqcapzRtqSLwJAZ6qXOKz+HyCwouQEqkEDc2g9cDrxrTE5hbSnTPU4iziOfcZWB18Wq4NA6slmrg+D4/UsE7HcBKhmxvI92x89mQJAb+OdiuhgxKQ9bDkI5DY+tLEEltjGBT/AXa302TVgNJ4mR7HGx4Y77XvWC6ycUKkwKCmbe/4RROVMQtXWGrOy1QJALCWCImrxJ8cq0GHihN91v+EM16JF2zMKiWQKLquoRbyudc/bziw2WpGDoRl1hgr1G6AQ0QbGp7FsS7kWJwFx7Q=='


//rotas
const login = async  (request, response) => {
  const vigilanteEncontrado = await adminsModel.findOne({ email: request.body.email })
  if (vigilanteEncontrado) {
    const senhaCorreta = bcrypt.compareSync(request.body.senha, vigilanteEncontrado.senha)

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          grupo: vigilanteEncontrado.tipoLogin,
          id: vigilanteEncontrado.id
        },
        SEGREDO,
        { expiresIn: 6000000 }
      )

      return response.status(200).send({ token })
    }

    return response.status(401).send('E-mail ou senha incorreta.')
  }

  return response.status(404).send('Dados não encontrados.')
}


const addVisita = async (request, response) => {
  const treinadorId = request.params.moradorId
  const visitante = request.body

  const novaVisita = new visitantesModel(visitante)
  const morador = await moradoresModel.findById(treinadorId)

  morador.visitas.push(novaVisita)
  morador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novaVisita)
  })
}

const updateVisita = (request, response) =>{
  const moradorId = request.params.moradorId
  const visitanteId = request.params.visitanteId
  const options = { new: true }

  moradoresModel.findOneAndUpdate(
    { _id: moradorId, 'visitas._id': visitanteId },
    {
      $set: {
        'visitas.$.nomeVisitante': request.body.nomeVisitante,
        'visitas.$.rg': request.body.rg
      }
    },
    options,
    (error, visitante) => {
      console.log(visitante)
      if (error) {
        return response.status(500).send(error)
      }

      if (visitante) {
        return response.status(200).send(visitante)
      }

      return response.status(404).send('Visitante não encontrado.')
    }
  )

}

const updateVigilante = (request,response) =>{
  const vigilanteId = request.params.vigilanteId
  const options = { new: true }
  const senhaUsuario = request.body.senha
  

if (senhaUsuario){
  senhaCriptografada = bcrypt.hashSync(senhaUsuario)

}

  adminsModel.findByIdAndUpdate(
    vigilanteId,{
      $set: {
        'nome': request.body.nome,
        'login': request.body.login,
        'senha': senhaCriptografada
      }},options,
    (error, vigilante) => {
      if (error) {
        return response.status(500).send(error)
      }

      if (vigilante) {
        return response.status(200).send(vigilante)
      }

      return response.status(404).send('Vigilante não encontrado.')
    }
  )
}




module.exports = {
  addVisita,
  login,
  updateVisita,
  updateVigilante
}