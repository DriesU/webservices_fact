const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        firstName:'Fons',
        lastName:'Van Callenberge',
      },
      {
        id: 2,
        firstName:'Palmyra',
        lastName:'Van Callenberge',
      },
      {
        id: 3,
        firstName:'Pol',
        lastName:'Thijs',
      },
    ]);
  },
};
