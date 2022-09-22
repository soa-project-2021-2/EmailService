const express = require('express')
const port = 8000;
const app = express({port: port})

const { Kafka } = require('kafkajs')
const { sendEmail } = require('./sendEmail')
const { createProduct, createUser } = require('./database/repository')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' })

async function Consumer() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
}
Consumer();
//createProduct('TV', 1200)
//sendEmail('gmaiaserafim@gmail.com', 'Olá', 'Boa tarde!', '<h1>HTML</h1>')