'use strict'

const User = use('App/Models/User');
const Mail = use('Mail');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Env = use('Env');

class ForgotPasswordController {
  async store({ request }) {
    const { email } = request.all();

    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(16);
    const token = random.toString();

    await user.tokens().create({
      token,
      type: 'Forgot'
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    await Mail.send(
      'emails.forgotPassword', 
      { username: user.username, resetPasswordUrl }, 
      (message) => {
        message
          .to(user.email)
          .from('support@adonisjs.com')
          .subject('Recover password')
      }
    );
  }  
}

module.exports = ForgotPasswordController
