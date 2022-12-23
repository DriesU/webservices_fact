/* eslint-disable quotes */
const { tables, getKnex } = require('../data');
const { getLogger } = require('../core/logging');


const findAll = () => {
  return getKnex()(tables.user)
    .select()
    .orderBy('id', 'desc');
};


const findCount = async () => {
  const [count] = await getKnex()(tables.user)
    .count();
  return count['count(*)'];
};


const findById = (id) => {
  return getKnex()(tables.user)
    .where('id', id)
    .first();
};


const createUser = async ({
  firstName,
  lastName,
  auth0id,
}) => {
  try {
    const [id] = await getKnex()(tables.user)
      .insert({
        firstName,
        lastName,
        auth0id: auth0id,
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

const findByAuth0Id =  (auth0id) => {
  //console.log("auth0id: " + auth0id);
  return getKnex()(tables.user)
    .where('auth0id', auth0id)
    .first();
};

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

module.exports = {
  findAll,
  findCount,
  findById,
  createUser,
  updateUserById,
  deleteById,
  findByAuth0Id,
};
