const winston = require('winston')
const fs = require('fs')
const MESSAGE = Symbol.for('message')

const jsonFormatter = (logEntry) => {
  const base = { timestamp: new Date() }
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json)
  return logEntry
}

const readLogs = (request, response) => {
  try {
    const data = fs.readFileSync('logs/index.log', 'utf8')
    response.status(200).json(JSON.parse(`[${data.replace(/([\n]+)/g,',').slice(0, -1)}]`))
  } catch (err) {
    try {
      const data = fs.readFileSync('./logs/index.log', 'utf8')
      response.status(200).json(JSON.parse(`[${data.replace(/([\n]+)/g,',').slice(0, -1)}]`))
    } catch (err) {
      console.error(err)
      response.status(400).json(err)
    }
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/index.log'
    })
  ]
})

module.exports = {
  readLogs,
  logger
}