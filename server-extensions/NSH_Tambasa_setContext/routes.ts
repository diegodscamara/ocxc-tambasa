import express, { Request, Response } from 'express'
import { logs, setContextController } from './main'

const app = express()
app.use(express.json())

app.get('/v1/status/setContext', (request: Request, response: Response) => {
  return response.status(200).json({
    service: {
      running: true
    }
  })
})

app.post('/v1/setContext', async (request: Request, response: Response) => {
  return setContextController.context(request, response)
})

app.get('/v1/logs/setContext', async (request: Request, response: Response): Promise<any> => {
  return logs.readLogs(request, response)
})

module.exports = app
