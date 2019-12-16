const express = require('express');
const router = express.Router();
const controller = require('../controller/moradoresController')

const autenticarAdminEMorador = (request, response, next) => {
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
        if (decoded.grupo == 'Admin' || decoded.grupo =='Usuario') {
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
const autenticarMorador = (request, response, next) => {
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
        if (decoded.grupo == 'Usuario') {
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

router.get('/:id/', autenticarMorador, controller.getMoradorById)
router.get('/:id/visitas',autenticarMorador, controller.getVisitas)
router.post('/login', controller.login)

router.patch('/:id', autenticarAdminEMorador, controller.updateMorador)

module.exports = router