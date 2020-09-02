const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Forgot Password');

const Mail = use('Mail');
const Factory = use('Factory');
const Hash = use('Hash');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

beforeEach(() => {
  Mail.fake();
});

afterEach(() => {
  Mail.restore();
});

async function generateForgotPasswordToken(email, client) {
  const user = await Factory.model('App/Models/User').create({ email });

  await client.post('/forgot-password').send({ email }).end();

  const token = await user.tokens().first();

  return token;
}

test('it should send a email with instructions of forgot password', async ({ client, assert }) => {
  const email = 'leandro@gmail.com';
  const token = await generateForgotPasswordToken(email, client);

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, email);
 
  assert.include(token.toJSON(), { 
    type: 'Forgot'
  })
});

test('it should reset password', async ({ assert, client }) => {
  const email = 'leandro@gmail.com';
  const { token } = await generateForgotPasswordToken(email, client);

  const response = await client.post('/reset')
    .send({
      token,
      password: '12345',
      password_confirmation: '12345'
    })
    .end();

  const user = await User.findBy('email', email);
  const checkPassword = await Hash.verify('12345', user.password);

  assert.isTrue(checkPassword);
});

