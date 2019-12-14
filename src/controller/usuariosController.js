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



//rotas para criação
const addUsuario = async (request, response) => {
  const dadosRequisicao = request.body
  dadosRequisicao.tipoLogin = "Usuario"
  criptografarSenha(dadosRequisicao)
  const novoMorador = new moradoresModel(dadosRequisicao);
  salvarUsuario(novoMorador, response)
}

const addAdmin = (request, response) => {
  const dadosRequisicao = request.body
  dadosRequisicao.tipoLogin = "Admin"
  criptografarSenha(dadosRequisicao)
  const novoAdmin = new adminsModel(dadosRequisicao);
  salvarUsuario(novoAdmin, response)
}


const addVigilante = (request, response) => {
  const dadosRequisicao = request.body
  dadosRequisicao.tipoLogin = "Vigilante"
  criptografarSenha(dadosRequisicao)
  const novoVigilante = new adminsModel(dadosRequisicao);
  salvarUsuario(novoVigilante, response)
}

const getMoradores = (request, response) => {
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

const deleteMorador = (request, response) => {
  const id = request.params.id

  moradoresModel.findByIdAndDelete(id, (error, morador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (morador) {
      return response.status(200).send(`O morador do ${id} foi excluido com sucesso!`)
    }

    return response.status(404).send('Morador não encontrado.')
  })
}

const deleteVigilante = (request, response) => {
  const id = request.params.id

  adminsModel.findByIdAndDelete(id, (error, vigilante) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (vigilante) {
      return response.status(200).send(`O vigilante do ${id} foi excluido com sucesso!`)
    }

    return response.status(404).send('Vigilante não encontrado.')
  })
}

const deleteAdmin = (request, response) => {
  const id = request.params.id

  adminsModel.findByIdAndDelete(id, (error, admin) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (admin) {
      return response.status(200).send(`O admin do ${id} foi excluido com sucesso!`)
    }

    return response.status(404).send('Admin não encontrado.')
  })
}

const login = async (request, response) => {
  const adminEncontrado = await adminsModel.findOne({ email: request.body.email })

  if (adminEncontrado) {
    const senhaCorreta = bcrypt.compareSync(request.body.senha, adminEncontrado.senha)

    if (senhaCorreta) {
      const token = jwt.sign(
        {
          grupo: adminEncontrado.tipoLogin,
          id: adminEncontrado.id
        },
        SEGREDO,
        { expiresIn: 6000 }
      )

      return response.status(200).send({ token })
    }

    return response.status(401).send('Senha incorreta.')
  }

  return response.status(404).send('Administrador não encontrado.')
}

module.exports = {
  addUsuario,
  addAdmin,
  addVigilante,
  getMoradores,
  getVigilantes,
  getAdmins,
  getMoradorById,
  getVigilanteById,
  deleteMorador,
  deleteVigilante,
  deleteAdmin,
  login

}