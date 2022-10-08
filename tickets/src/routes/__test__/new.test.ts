import request from 'supertest';
import { app } from '../../app';

describe('New tickets', () => {
  it('Has a route handler listening to api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send();
    expect(response.status).not.toEqual(404);
  });

  it('Only can be accessed if the user signin', async () => {
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).toEqual(401);
  });

  it('Returns a status different to 401 if the user is signin', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({});
    expect(response.status).not.toEqual(401);
  });

  it('Returns an error if an invalid title is provided', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 123,
      });
    expect(response.status).toEqual(400);
  });

  it('Returns an error if an invalid price is provided', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'ticket',
        price: null,
      });
    expect(response.status).toEqual(400);
  });

  it('Creates a ticket with valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'test',
        price: 123,
      });
    expect(response.status).toEqual(201);
  });
});
