const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        firstName:'Fons',
        lastName:'Van Callenberge',
        auth0id: 'unknown',
      },
      {
        id: 2,
        firstName:'Palmyra',
        lastName:'Van Callenberge',
        auth0id: 'unknown',
      },
      {
        id: 3,
        firstName:'Dries',
        lastName:'Uytterschaut',
        auth0id: 'unknown',
      },
    ]);
  },
};
