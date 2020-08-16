const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

afterAll((done) => {
  connection.destroy();
  done();
});

describe('controller of users', () => {
  it('should list an array of users', async () => {
    const user = await connection('users').insert({
      user: 'leandro',
      email: 'leandro@gmail.com',
    });

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
  });

  it('should create an user', async () => {
    const response = await request(app).post('/users').send({
      user: 'leandro-wrf',
      email: 'leandro@gmail.com',
    });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(201);
  });

  it('should return 400, case an yield set with null', async () => {
    const response = await request(app).post('/users').send({
      user: 'leandro-wrf',
    });

    expect(response.body).toHaveProperty('Error');
    expect(response.status).toBe(400);
  });

  it('should update an user', async () => {
    const user = await connection('users').insert({
      user: 'leandro',
      email: 'leandro@gmail.com',
    });

    const response = await request(app)
      .put(`/users/${user[0]}`)
      .send({ user: 'leandro5g' });

    expect(response.status).toBe(201);
  });

  it('should return 404, case user not exists', async () => {
    const user = await connection('users').insert({
      user: 'leandro',
      email: 'leandro@gmail.com',
    });

    const response = await request(app)
      .put(`/users/${user[0] + 1}`)
      .send({ user: 'leandro5g' });

    expect(response.status).toBe(404);
  });

  it('should delete an user', async () => {
    const user = await connection('users').insert({
      user: 'leandro',
      email: 'leandro@gmail.com',
    });

    const response = await request(app).delete(`/users/${user[0]}`);

    expect(response.status).toBe(200);
  });

  it('should not delete an user with id wrong', async () => {
    const user = await connection('users').insert({
      user: 'leandro',
      email: 'leandro@gmail.com',
    });

    const idWrong = user[0] + 1;

    const response = await request(app).delete(`/users/${idWrong}`);

    expect(response.status).toBe(404);
  });
});
