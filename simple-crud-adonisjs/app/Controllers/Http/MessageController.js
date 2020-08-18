'use strict'

const Message = use("App/Models/Message");

class MessageController {
  async index ({ request, response, view }) {
    const messages = Message.query().with('user').fetch();

    return messages;
  }

  async store ({ request, auth }) {
    const data = request.only(['content']);
    const message = await Message.create({
      user_id: auth.user.id, 
      ...data
    });

    return message;
  }

  async show ({ params }) {
    const message = await Message.findOrFail(params.id);

    return message;
  }

  async destroy ({ params, response, auth }) {
    const message = await Message.findOrFail(params.id);

    if (message.user_id !== auth.user.id) {
      return response.status(401);
    }

    await message.delete();
  }
}

module.exports = MessageController
