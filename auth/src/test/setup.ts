import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo;

beforeAll(async () => {
  process.env.JWT_KEY = 'key';
  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let c of collections) {
    await c.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@gmail.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
