import fs from 'fs'
import { Request, Response } from 'express'
export class LogsReadController {
  readLogs (request: Request, response: Response): void {
    try {
      const data = fs.readFileSync('logs/logfilSetContext.log', 'utf8')
      response.status(200).json(JSON.parse(`[${data.replace(/([\n]+)/g,',').slice(0, -1)}]`))
    } catch (err) {
      try {
        const data = fs.readFileSync('./logs/logfilSetContext.log', 'utf8')
        response.status(200).json(JSON.parse(`[${data.replace(/([\n]+)/g,',').slice(0, -1)}]`))
      } catch (err) {
        console.error(err)
        response.status(400).json(err)
      }
    }
  }
}
