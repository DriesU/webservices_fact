const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

/**
 * Find all likedFacts.
 */
const findAll = () => {
  return getKnex()(tables.likedFact)
    .select()
    .orderBy('userId', 'ASC');
};

//find all likedFacts from a specific user (userId) and show with fact from fact table
const findAllFromUserWithFact = (userId) => {
  return getKnex()(tables.likedFact)
    .select()
    .where('userId', userId)
    .orderBy('userId', 'ASC')
    .join(tables.fact, 'likedFacts.factId', '=', 'facts.id')
    .select('likedFacts.userId', 'facts.fact', 'likedFacts.factId')
    .orderBy('likedFacts.factId', 'ASC');

};

// eslint-disable-next-line max-len
//join 3 tables: facts, likedFacts and categories. show all likedFacts from a specific user (userId) and show the facts with the same categoryId as parameter (categoryId)
const findAllFromUserWithFactAndCategory = (userId) => {
  return getKnex()(tables.category)
    .select()
    .join(tables.fact, 'categories.id', '=', 'facts.categoryId')
    .join(tables.likedFact, 'facts.id', '=', 'likedFacts.factId')
    .select('likedFacts.userId','facts.fact', 'likedFacts.factId','categories.name', 'categories.id')
    .where('likedFacts.userId', userId);
};

// delete a likedFact, the likedFact is identified by the factId and the userId
const deleteById = async (userId, factId) => {
  try {
    await getKnex()(tables.likedFact)
      .delete()
      .where('factId', factId)
      .andWhere('userId', userId);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};


module.exports = {
  findAll,
  findAllFromUserWithFact,
  findAllFromUserWithFactAndCategory,
  deleteById,
};
