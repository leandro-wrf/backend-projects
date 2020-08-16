const connection = require('../database/connection');

function UserController() {
  async function index(req, res) {
    const data = await connection('users').select([
      'id',
      'user',
      'created',
      'updated',
    ]);

    return res.status(200).json(data);
  }

  async function create(req, res) {
    const { user, email } = req.body;

    try {
      await connection('users').insert({
        user,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        Error: 'Verify input requireds',
      });
    }

    return res.status(201).json({
      message: `Your user to login: ${user}`,
    });
  }

  async function update(req, res) {
    const { id } = req.params;
    const { user } = req.body;

    const userExists = await connection('users')
      .where('id', '=', id)
      .update({ user });

    if (!userExists) {
      return res.status(404).json({
        Error: 'User not found',
      });
    }

    return res.status(201).json({
      message: `New user name: ${user}`,
    });
  }

  async function destroy(req, res) {
    const { id } = req.params;

    const userExists = await connection('users').where('id', '=', id).del();

    if (!userExists) {
      return res.status(404).json({
        Error: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'User deleted',
    });
  }

  return {
    index,
    create,
    update,
    destroy,
  };
}

module.exports = UserController();
