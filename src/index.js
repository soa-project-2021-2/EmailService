const express = require('express')
const PORT = 8000;
const app = express({ port: PORT })

const { Kafka } = require('kafkajs')
const eurekaHelper = require('./eurekaClient');
const { sendEmail } = require('./sendEmail')
const { createProduct, createUser } = require('./database/repository')

// eurekaHelper.registerWithEureka('email-service', PORT);

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'email-group' })

async function Consumer() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'user-topic', fromBeginning: true })
  //await consumer.subscribe({ topic: 'orders-topic', fromBeginning: true })
  //await consumer.subscribe({ topic: 'buy-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case 'user-topic':
          const user = JSON.parse(message.value);
          createUser(user.name, user.email, true)
          sendEmail(
            user.email,
            'Welcome to Nazoma Community!',
            'We are very happy with your arrival! As a welcome gift, you will receive a coupon with your first purchase.')
          break;
        default:
          console.log('Case default, no topic found')
      }
    },
  });
}
Consumer();
//createProduct('TV', 1200)
//sendEmail('gmaiaserafim@gmail.com', 'Olá', 'Boa tarde!', '<h1>HTML</h1>')