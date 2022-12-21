const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

/** 
const formatfact = ({ likedFact_id, likedFact_name, user_id, user_name, ...rest }) => ({
  ...rest,
  likedFact: {
    id: likedFact_id,
    name: likedFact_name,
  },
  user: {
    id: user_id,
    name: user_name,
  },
}); 
*/


/**
 * Get all facts.
 */
const findAll = async () => {
  return getKnex()(tables.fact)
    .select()
    .orderBy('id', 'desc');
};

/**
 * Find a fact with the given `id`.
 */
const findById = async (id) => {
  return getKnex()(tables.fact)
    .select()
    .where(`${tables.fact}.id`, id)
    .first(); 
};

/**
 * Create a new fact.
 */
const create = async ({
  fact,
  categoryId,
}) => {
  try {
    const [id] = await getKnex()(tables.fact)
      .insert({
        fact,
        categoryId,
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
 * Update an existing fact.
 */
const updateById = async (id, {
  fact,
  categoryId,
}) => {
  try {
    await getKnex()(tables.fact)
      .update({
        fact,
        categoryId,
      })
      .where(`${tables.fact}.id`, id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a fact with the given `id`.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.fact)
      .delete()
      .where(`${tables.fact}.id`, id);
    return rowsAffected > 0;
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
  // findCount,
  findById,
  create,
  updateById,
  deleteById,
};
