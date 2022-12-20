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
const findAllFromUserWithFactAndCategory = () => {
  return getKnex()(tables.category)
    .select()
    .join(tables.fact, 'categories.id', '=', 'facts.categoryId')
    .join(tables.likedFact, 'facts.id', '=', 'likedFacts.factId')
    .select('likedFacts.userId','facts.fact', 'likedFacts.factId','categories.name', 'categories.id');
};






  
   






/**
 * Find a likedFact with the given `id`.
 *
 * @param {number} id - Id of the likedFact to find.
 */
const findById = (id) => {
  return getKnex()(tables.likedFact)
    .where('id', id)
    .first();
};

/**
 * Calculate the total number of likedFacts.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.likedFact)
    .count();
  return count['count(*)'];
};

/**
 * Create a new likedFact with the given `name` and `rating`.
 *
 * @param {object} likedFact - likedFact to create.
 * @param {string} likedFact.name - Name of the likedFact.
 * @param {number} [likedFact.rating] - Rating given to the likedFact (1 to 5).
 *
 * @returns {Promise<number>} Created likedFact's id
 */
//create a likedFact, the likedFact is identified by the factId and the userId
const create = async ({
  factId,
  userId,
}) => {
  try {
    const [id] = await getKnex()(tables.likedFact)
      .insert({
        factId,
        userId,
      });

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Update an existing likedFact with the given `name` and `rating`.
 *
 * @param {number} id - Id of the likedFact to update.
 * @param {object} likedFact - likedFact to create.
 * @param {string} [likedFact.name] - Name of the likedFact.
 * @param {number} [likedFact.rating] - Rating given to the likedFact (1 to 5).
 *
 * @returns {Promise<number>} likedFact's id
 */
const updateById = async (id, {
  name,
  rating,
}) => {
  try {
    await getKnex()(tables.likedFact)
      .update({
        name,
        rating,
      })
      .where('id', id);

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
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
  findById,
  findCount,
  create,
  updateById,
  deleteById,
};
