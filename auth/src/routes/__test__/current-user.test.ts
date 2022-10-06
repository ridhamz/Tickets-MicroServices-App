import request from 'supertest';
import { app } from '../../app';

describe('Current USer', () => {
  it('returns details about the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .get('/api/users/current')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@gmail.com');
  });

  it('returns with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/current')
      .send()
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });
});
