import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

describe('Show ticket by id', () => {
  it('Returns 404 if the ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
      .get(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send();
    expect(response.status).toEqual(404);
  });

  it('Returns the ticket if it is already exist', async () => {
    // create a ticket
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        title: 'ticket 1',
        price: 20,
      })
      .expect(201);

    // get the ticket
    const ticket = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .set('Cookie', global.signin())
      .send();
    expect(ticket.body.title).toEqual('ticket 1');
    expect(ticket.body.price).toEqual(20);
  });
});
