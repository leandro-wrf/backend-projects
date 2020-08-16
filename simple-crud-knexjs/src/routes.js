const { Router } = require('express');

const routes = Router();

const { UserController } = require('./controllers');

routes
  .get('/users', UserController.index)
  .post('/users', UserController.create)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.destroy);

module.exports = routes;
