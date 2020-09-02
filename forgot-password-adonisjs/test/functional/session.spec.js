const { test, trait } = use('Test/Suite')('Autenticate User');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should return a token JWT', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create({
    email: 'leandro@gmail.com',
    password: '123'
  });

  const response = await client.post('/session').send({
    email: 'leandro@gmail.com',
    password: '123'
  }).end();

  response.assertStatus(201);
  assert.exists(response.body.token);
});

