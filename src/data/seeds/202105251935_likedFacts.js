const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.likedFact).insert([
      {
        userId: 1,
        factId: 1,
      },
      {
        userId: 2,
        factId: 3,
      },
      {
        userId: 3,
        factId: 2,
      },
      {
        userId: 1,
        factId: 3,
      },
      {
        userId: 2,
        factId: 1,
      },
    ]);
  },
};
