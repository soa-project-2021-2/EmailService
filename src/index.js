const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

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

const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer({createPartitioner: Partitioners.DefaultPartitioner});
const consumer = kafka.consumer({ groupId: 'test-group' });

async function Consumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
}

async function Producer() {
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  });
  
  await producer.disconnect();
}

// Producer();
// Consumer();