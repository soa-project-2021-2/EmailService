const express = require('express')
const PORT = 8000;
const app = express({ port: PORT })

const { Kafka } = require('kafkajs')
const eurekaHelper = require('./eurekaClient');
const { sendEmail } = require('./sendEmail')
const { createUser, getUserById, getUsers } = require('./database/repository')
const { messageByStatus } = require('./utils')

// eurekaHelper.registerWithEureka('email-service', PORT);

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'email-group' })

getUsers().then(data => console.log(data))
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
          createUser(user.user_id, user.name, user.email, true)
          sendEmail(
            user.email,
            'Welcome to Nazoma Community!',
            'We are very happy with your arrival! As a welcome gift, you will receive a coupon with your first purchase.')
          break;
        case 'orders-topic':
          const order = JSON.parse(message.value);
          let userOrder = null
          getUserById(order.userId).then(val => {
            userOrder = val
          })
          sendEmail(
            userOrder.email,
            `Update about your order #${order.id}`,
            messageByStatus(order.status, order.id))
          break;
        case 'buy-topic':
          const news = JSON.parse(message.value);
          let users = null
          getUsers().then(data => {
            users = data
          })
          users.forEach(user => {
            sendEmail(
              user.dataValues.email,
              `Unmissable promotion at Nazoma Store`,
              `${news.name} for only $${news.price}`)
          });
          break;
        default:
          console.log('Case default, no topic found')
      }
    },
  });
}
Consumer();