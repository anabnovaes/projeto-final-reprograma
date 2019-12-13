const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).send({
    title: "Sistema de gestão de moradores do condomínio dos Sonhos",
    version: "1.0.0"
  })
});

module.exports = router