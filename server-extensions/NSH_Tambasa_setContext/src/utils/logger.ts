import winston from 'winston'
const MESSAGE = Symbol.for('message')

const jsonFormatter = (logEntry: any): any => {
  const base = { timestamp: new Date() }
  console.dir('logEntry')
  console.log(logEntry)
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json)
  return logEntry
}
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/logfilSetContext.log'
    })
  ]
})
