'use strict'

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const { type, token  } = await auth.attempt(email, password);

    return response.status(201).json({
      type,
      token
    });
  }
}

module.exports = SessionController
