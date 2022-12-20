const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.fact, (table) => {
      
      //this table has 3 columns, id, fact, and categoryid
      //the id is the primary key
      //the fact is a string
      //the categoryid is a foreign key that references the category table#
      // eslint-disable-next-line max-len
      //Error: alter table `facts` add constraint `facts_categoryid_foreign` foreign key (`categoryId`) references `categories` (`id`) - Failed to open the referenced table 'categories'#

      table.increments('id');
      table.string('fact', 255)
        .notNullable();
      table.integer('categoryId')
        .unsigned()
        .notNullable();
     
     
      
      
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.fact);
  },
};
