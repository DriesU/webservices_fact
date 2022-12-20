const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).insert([
      {
        id: 1,
        name: 'geschiedenis',
      },
      {
        id: 2,
        name: 'wetenschap',
      },
      {
        id: 3,
        name: 'andere',
      },
    ]);
  },
};
