const { tables, getKnex } = require('../data');
const { getLogger } = require('../core/logging');

/**
 * Get all users.
 */
const findAll = () => {
  return getKnex()(tables.user)
    .select();
};

/**
 * Calculate the total number of user.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.user)
    .count();
  return count['count(*)'];
};

/**
 * Find a user with the given id.
 *
 * @param {string} id - The id to search for.
 */
const findById = (id) => {
  return getKnex()(tables.user)
    .where('id', id)
    .first();
};

/**
 * Create a new user with the given `name`.
 *
 * @param {object} user - User to create.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the created user.
 */
const create = async ({
  name,
}) => {
  try {
    const [id] = await getKnex()(tables.user)
      .insert({
        name,
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
 * Update a user with the given `id`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the updated user.
 */
//add a user to the database, user needs a first and lastname 
/*
const updateUserById = async (id, {
  firstName,
  lastName,
}) => {
  try {
    const [rowsAffected] = await getKnex()(tables.user)
      .update({
        firstName,
        lastName,
      })
      .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateUserById', {
      error,
    });
    throw error;
  }
};

const updateUserById = async (id, {
  firstName,
  lastName,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        firstName,
        lastName,
      })
      .where(`${tables.user}.id`, id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateUserById', {
      error,
    });
    throw error;
  }
};
*/
//update a user, the user is identified by the id, make sure it doesn't result in a error (empty updatce call), thankyou
const updateUserById = async  (id, {
  firstName,
  lastName,
}) => {
  try {
    const [rowsAffected] = await getKnex()(tables.user)
      .where('id', id)
      .update({
        firstName: firstName,
        lastName: lastName,
      });
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateUserById', {
      error,
    });
    throw error;
  }
};





/**
 * Update a user with the given `id`.
 *
 * @param {string} id - Id of the user to delete.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user)
      .delete()
      .where('id', id);
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
  findCount,
  findById,
  create,
  updateUserById,
  deleteById,
};
