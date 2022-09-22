const express = require('express');
const port = 8000;
const app = express({port: port});


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

"use strict";
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("./config/smtp")
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log('user: ', testAccount.user, 'pass: ', testAccount.pass)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_CONFIG.user, // generated ethereal user
      pass: SMTP_CONFIG.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <nazoma.ecommerce@gmail.com>', // sender address
    to: "gmaiaserafim@gmail.com", // list of receivers
    subject: "Hello World", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world? aaaaaaaaaaaaaa</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//db
(async () => {
    const database = require('./db');
    const User = require('./users');
 
    try {
        const resultado = await database.sync();
        // console.log(resultado);

        // const resultadoCreate = await User.create({
        //     nome: 'Lucas Meliante',
        //     email: 'meliante@gmail.com'
        // })
        // console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }
})();

//kafka
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function Consumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })

      sendEmail().catch(console.error);
    },
  });
}

Consumer();