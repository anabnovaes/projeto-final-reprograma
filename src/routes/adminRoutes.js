const express = require("express");
const router = express.Router();
const controller = require("../controller/usuariosController")

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
        if (decoded.grupo == 'admin') {
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
router.delete('/:id',autenticar, controller.deleteAdmin)
router.post('/login', controller.login)

// rotas para vigilantes
router.post('/vigilantes', autenticar,controller.addVigilante)
router.get('/vigilantes',autenticar, controller.getVigilantes)
router.get('/vigilantes/:id',autenticar, controller.getVigilanteById)
router.delete('/vigilantes/:id',autenticar,controller.deleteVigilante)


//rotas para proprietarios
router.post('/proprietarios',autenticar,controller.addUsuario)
router.get('/proprietarios',autenticar, controller.getMoradorById)
router.get('/proprietarios/:id',autenticar, controller.getMoradorById)
router.delete('/proprietarios/:id',autenticar,controller.deleteMorador)


module.exports = router