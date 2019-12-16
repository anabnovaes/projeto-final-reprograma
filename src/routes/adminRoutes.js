const express = require('express');
const router = express.Router();
const controller = require('../controller/adminsController')
const jwt = require('jsonwebtoken')
const SEGREDO = process.env.SEGREDO || 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAM0546KHReasmp74l9YctYjNx2aduJFhJMBRei6eIE9jVQeLoU667G7MeOYA2TxDlv6Qwx9eg6nS1bMP7FLbiG9MhW2qDIfAwbxrV1cadu0G/52RP8Fp9enD2ryF0zHHwQo5cK6E+vQbTIFK4NFR5zLPaOZciw/FdfAVWgotZYjXAgMBAAECgYEAxSgH9+vcy26mXHKV66xI+dQ26+45kfCxTdD4gDCI+buDxGvv26LX4Nmui8fk6nBEburDiS9TbaKOiieR8UfWGN3vkvj3XU7pbRUhGVtPbU3HCxUPGmh3oPoWRfyiry+ageQKfc9eHqWN+MFjgklNpjj4sbr7lyL13dPREAUIkwECQQDrC5VcLCqDQxGlwc4WLJBUs6edhJvpq/CCWl0rAN9U+JopMMWEbMbxN7h9/y4zOnG7VdjqJnPrdNcRYHbeHZHZAkEA34W/KEvg00tJxwXUf2hy08iTBBWDWQ0bVr7kYocysPAufeK9ok3Xy18mz3+2EH4cMlSWLp1D1cmqcapzRtqSLwJAZ6qXOKz+HyCwouQEqkEDc2g9cDrxrTE5hbSnTPU4iziOfcZWB18Wq4NA6slmrg+D4/UsE7HcBKhmxvI92x89mQJAb+OdiuhgxKQ9bDkI5DY+tLEEltjGBT/AXa302TVgNJ4mR7HGx4Y77XvWC6ycUKkwKCmbe/4RROVMQtXWGrOy1QJALCWCImrxJ8cq0GHihN91v+EM16JF2zMKiWQKLquoRbyudc/bziw2WpGDoRl1hgr1G6AQ0QbGp7FsS7kWJwFx7Q=='

//verificar a autenticação do usuario
const autenticar = (request, response, next) => {
  const authHeader = request.get('authorization')
  let autenticado = false

  if (!authHeader) {
    return response.status(401).send('Você precisa fazer login!')
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, SEGREDO, (error, decoded) => {
    if (error) {
      autenticado = false
    } else {
      if (decoded.grupo == 'Admin') {
        autenticado = true
      } else {
        autenticado = false
      }
    }
  })

  if (!autenticado) {
    return response.status(403).send('Acesso negado.')
  }

  next()
}


// rotas para administrador 
router.post('/', autenticar, controller.addAdmin)
router.get('/', autenticar, controller.getVigilantes)
router.delete('/:id', autenticar, controller.deleteAdmin)
router.post('/login', controller.login)

// rotas para vigilantes
router.post('/vigilantes', autenticar, controller.addVigilante)
router.get('/vigilantes', autenticar, controller.getVigilantes)
router.get('/vigilantes/:id', autenticar, controller.getVigilanteById)
router.delete('/vigilantes/:id', autenticar, controller.deleteVigilante)


//rotas para proprietarios
router.post('/proprietarios', autenticar, controller.addUsuario)
router.get('/proprietarios', autenticar, controller.getMoradorById)
router.get('/proprietarios/:id', autenticar, controller.getMoradorById)
router.delete('/proprietarios/:id', autenticar, controller.deleteMorador)


module.exports = router