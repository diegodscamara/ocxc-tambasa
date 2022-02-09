// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressListRoutes = require('express-list-routes')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require('./routes')

const port = 3001
app.listen(process.env.PORT ?? port, () => {
  const server = {
    message: `servidor subiu na porta ${process.env.PORT ?? port} 🚀😁`
  }
  console.table(server)
  console.log('*-- Routes --*')
  expressListRoutes(app)
})
