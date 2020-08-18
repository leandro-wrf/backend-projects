'use strict'

const Route = use('Route')

Route.post('/register', 'UserController.create');
Route.post('/autenticate', 'AuthController.store');

Route.group(() => {
  Route.resource('messages', 'MessageController')
    .apiOnly()
    .except('update');
}).middleware('auth');
