const app = require('./src/app.js')
const PORT = process.env.PORT|| 3000

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`)
})

