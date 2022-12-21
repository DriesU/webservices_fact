const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.category, (table) => {
      table.increments('id');
      table.string('name', 255)
        .notNullable();
      table.primary(['id']);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.category);
  },
};
