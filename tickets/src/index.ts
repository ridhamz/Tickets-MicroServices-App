import { app } from './app';
import mongoose from 'mongoose';

async function start() {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
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
