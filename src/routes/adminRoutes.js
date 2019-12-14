const express = require("express");
const router = express.Router();

const controller = require("../controller/usuariosController")
// rotas para administrador 
router.post('/', controller.addAdmin)
router.get('/', controller.getVigilantes)

// rotas para vigilantes
router.post('/vigilantes', controller.addVigilante)
router.get('/vigilantes', controller.getVigilantes)
router.get('/vigilantes/:id', controller.getVigilanteById)


//rotas para proprietarios
router.post('/proprietarios',controller.addUsuario)
router.get('/proprietarios', controller.getProprietarios)
router.get('/proprietarios/:id', controller.getMoradorById)


module.exports = router