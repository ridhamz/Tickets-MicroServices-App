import request from 'supertest';
import { app } from '../../app';

describe('Sigin', () => {
  it('returns a 200 on successful', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(201);

    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(200);
  });

  it('returns a 400 with an incorrect email or password', async () => {
    return request(app)
      .post('/api/users/signin')
      .send({
        email: 'testgmail.com',
        password: 'password',
      })
      .expect(400);
  });

  it('sets a cookie after successful', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
