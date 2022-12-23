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
        firstName:'dries',
        lastName:'uytterschaut',
        auth0id: 'auth0|63a47b8b808e526995f00fe6',
      },
    ]);
  },
};
