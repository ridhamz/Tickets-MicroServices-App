import { app } from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';

async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await natsWrapper.connect('ticketing', 'client id', 'http://nats-srv:4222');

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets');
    console.log('connected to the database');
  } catch (error) {
    console.error(error);
  }
}

app.listen(5001, () => {
  start();
  console.log('Tickets service: listening on PORT 5001 ');
});
