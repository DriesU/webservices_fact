const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.fact).insert([
      { // User Thomas
        id: 1,
        fact: 'De eerste mens die een vliegtuig bestuurde was een Belg.',
        categoryId: 1,
   
      },
      {
        id: 2,
        fact: 'De eerste Belgische astronaut was Jean-François Clervoy.',
        categoryId: 2,
    
      },
      {
        id: 3,
        fact: 'De eerste Belgische vrouwelijke astronaut was Claudie Haigneré.',
        categoryId: 3,
 
      },
      { // User Pieter
        id: 4,
        fact:'A crocodile cannot stick its tongue out.' ,
        categoryId: 1,
    
      },
      {
        id: 5,
        fact: 'A shrimp has his heart in its head',
        categoryId: 2,
   
      },
    ]);
  },
};
