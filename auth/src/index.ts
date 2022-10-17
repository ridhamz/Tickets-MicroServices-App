import { app } from './app';
import mongoose from 'mongoose';

async function start() {
  console.log('Starting auth service...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to the database');
  } catch (error) {
    console.error(error);
  }
}

app.listen(5000, () => {
  start();
  console.log('Auth service: listening on PORT 5000 ');
});
