exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('user').notNullable();
    table.string('email').notNullable();

    table.timestamp('created').defaultTo(knex.fn.now());
    table.timestamp('updated').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
