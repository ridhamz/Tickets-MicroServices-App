import request from 'supertest';
import { app } from '../../app';

describe('Signup', () => {
  it('returns a 201 on successful', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'testgmail.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'testgmail.com',
        password: '',
      })
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(201);

    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(400);
  });

  it('sets a cookie after successful', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
