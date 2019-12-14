const { moradoresModel } = require("../model/moradoresSchema");
const bcrypt = require("bcryptjs");
const { adminsModel } = require("../model/adminsSchema")
const jwt = require("jsonwebtoken")
const SEGREDO = process.env.SEGREDO || 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAM0546KHReasmp74l9YctYjNx2aduJFhJMBRei6eIE9jVQeLoU667G7MeOYA2TxDlv6Qwx9eg6nS1bMP7FLbiG9MhW2qDIfAwbxrV1cadu0G/52RP8Fp9enD2ryF0zHHwQo5cK6E+vQbTIFK4NFR5zLPaOZciw/FdfAVWgotZYjXAgMBAAECgYEAxSgH9+vcy26mXHKV66xI+dQ26+45kfCxTdD4gDCI+buDxGvv26LX4Nmui8fk6nBEburDiS9TbaKOiieR8UfWGN3vkvj3XU7pbRUhGVtPbU3HCxUPGmh3oPoWRfyiry+ageQKfc9eHqWN+MFjgklNpjj4sbr7lyL13dPREAUIkwECQQDrC5VcLCqDQxGlwc4WLJBUs6edhJvpq/CCWl0rAN9U+JopMMWEbMbxN7h9/y4zOnG7VdjqJnPrdNcRYHbeHZHZAkEA34W/KEvg00tJxwXUf2hy08iTBBWDWQ0bVr7kYocysPAufeK9ok3Xy18mz3+2EH4cMlSWLp1D1cmqcapzRtqSLwJAZ6qXOKz+HyCwouQEqkEDc2g9cDrxrTE5hbSnTPU4iziOfcZWB18Wq4NA6slmrg+D4/UsE7HcBKhmxvI92x89mQJAb+OdiuhgxKQ9bDkI5DY+tLEEltjGBT/AXa302TVgNJ4mR7HGx4Y77XvWC6ycUKkwKCmbe/4RROVMQtXWGrOy1QJALCWCImrxJ8cq0GHihN91v+EM16JF2zMKiWQKLquoRbyudc/bziw2WpGDoRl1hgr1G6AQ0QbGp7FsS7kWJwFx7Q=='

//funções globais
const salvarUsuario = (usuario, response) => {
  usuario.save((error) => {
    if (error) {
      return response.status(500).json({ erro: error })
    }

    return response.status(201).json(usuario)
  })
}
const criptografarSenha = (dadosUsuario) => {
  const senhaCriptografada = bcrypt.hashSync(dadosUsuario.senha)
  dadosUsuario.senha = senhaCriptografada;
  return dadosUsuario
}
const gerarTokenAdmin = (dadosUsuario) => {
  const token = jwt.sign(
    {
      nivel: dadosUsuario.tipoLogin
    },
    SEGREDO
  )
  dadosUsuario.token = bcrypt.hashSync(token)
  return dadosUsuario

}
 
const gerarTokenUsuario = (dadosUsuario) => {
  const token = jwt.sign(
    {
      login: dadosUsuario.login
    },
    SEGREDO
  )
  dadosUsuario.token = bcrypt.hashSync(token)
  return dadosUsuario.token

}



//rotas para criação
const addUsuario = async (request, response) => {
  const dadosRequisicao = request.body
  criptografarSenha(dadosRequisicao)
  dadosRequisicao.token = gerarTokenUsuario(dadosRequisicao)
  const novoMorador = new moradoresModel(dadosRequisicao);
  salvarUsuario(novoMorador, response)
}

const addAdmin = (request, response) => {
  const dadosRequisicao = request.body
  dadosRequisicao.tipoLogin = "Admin"
  gerarTokenAdmin(dadosRequisicao)
  criptografarSenha(dadosRequisicao)
  const novoAdmin = new adminsModel(dadosRequisicao);
  salvarUsuario(novoAdmin, response)
}


const addVigilante = (request, response) => {
  const dadosRequisicao = request.body
  dadosRequisicao.tipoLogin = "Vigilante"
  gerarTokenAdmin(dadosRequisicao)
  criptografarSenha(dadosRequisicao)
  const novoVigilante = new adminsModel(dadosRequisicao);
  salvarUsuario(novoVigilante, response)
}

const getProprietarios = (request, response) => {
  moradoresModel.find((error, proprietarios) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(proprietarios)
  })
}

const getVigilantes = (request, response) => {
  adminsModel.find({ tipoLogin: "Vigilante" }, (error, vigilantes) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(vigilantes)
  })
}

const getAdmins = (request, response) => {
  adminsModel.find({ tipoLogin: "Admin" }, (error, admins) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(admins)
  })
}

const getMoradorById = (request, response) => {
  const id = request.params.id

  return moradoresModel.findById(id, (error, morador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (morador) {
      return response.status(200).send(morador)
    }

    return response.status(404).send('Morador não encontrado.')
  })
}


const getVigilanteById = (request, response) => {
  const id = request.params.id

  return adminsModel.findById(id, (error, vigilante) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (vigilante) {
      return response.status(200).send(vigilante)
    }

    return response.status(404).send('Vigilante não encontrado.')
  })
}
module.exports = {
  addUsuario,
  addAdmin,
  addVigilante,
  getProprietarios,
  getVigilantes,
  getAdmins,
  getMoradorById,
  getVigilanteById

}