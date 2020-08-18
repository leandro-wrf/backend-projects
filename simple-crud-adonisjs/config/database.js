'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: Env.get('DB_DEBUG', false)
  }
}
