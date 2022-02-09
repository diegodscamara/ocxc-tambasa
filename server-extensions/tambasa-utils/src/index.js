const express = require('express')
const nodemailer = require("nodemailer");
const app = express()

const { creditCardPayload, invoicedPayload } = require('./services/dummyPayloads')

app.use(express.json())

app.post("/v1/payment/credit-card", (request, response) => {
  const { body } = request

  if(global && global.occ) {
    global.occ.logger.info('request body')
    global.occ.logger.info(body)
  }

  const payload = creditCardPayload(body)

  response
    .status(200)
    .send(payload)
})

app.post("/v1/payment/generic", (request, response) => {
  const { body } = request

  if(global && global.occ) {
    global.occ.logger.info('request body')
    global.occ.logger.info(body)
  }

  const payload = invoicedPayload(body)

  response
    .status(200)
    .send(payload)
})

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(name, email, cellphone, message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "test.sandbox.nsh@gmail.com", // generated ethereal user
        pass: "sandbox01", // generated ethereal password
      },
      logger: true,
      debug: true
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "test.sandbox.nsh@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Contact Us Email", // Subject line
      text: `Olá, sou ${name}, do telefone ${cellphone}. Gostaria de ${message}`, // plain text body
      //html: "",
    });

    return info.messageId
}

app.post("/v1/email", async (request, response) => {
    const { body } = request

    const { name, email, cellphone, message } = body

    try {
        const msgId = await sendEmail(name, email, cellphone, message)
        response.status(200).send({msgId})
    } catch(e) {
        response.status(400).send({e})
    }

})

// app.listen(3000, () => console.log('Server is running!'))
    
module.exports = app