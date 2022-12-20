const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.likedFact, (table) => {
      
      //the composite primary key is a combination of the user id and the fact id
      table.integer('userId')
        .unsigned()
        .notNullable(); 
      table.integer('factId')
        .unsigned()
        .notNullable();
      table.primary(['userId', 'factId']);
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.likedFact);
  },
};
