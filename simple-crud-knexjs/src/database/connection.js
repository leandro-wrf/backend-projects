const knex = require('knex');
const config = require('../../knexfile');

const connection = knex(
  process.env.NODE_ENV === 'development' ? config.development : config.test
);

module.exports = connection;
