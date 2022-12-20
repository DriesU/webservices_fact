const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const userRepository = require('../repository/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Register a new user
 *
 * @param {object} user - The user's data.
 * @param {string} user.name - The user's name.
 */
const register = ({
  name,
}) => {
  debugLog('Creating a new user', {
    name,
  });
  return userRepository.create({
    name,
  });
};


/**
 * Get all users.
 */
const getAll = async () => {
  debugLog('Fetching all users');
  const data = await userRepository.findAll();
  const totalCount = await userRepository.findCount();
  return {
    data,
    count: totalCount,
  };
};

/**
 * Get the user with the given id.
 *
 * @param {string} id - Id of the user to get.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);

  if (!user) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }

  return user;
};


/**
 * Update an existing user.
 *
 * @param {string} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} [user.name] - Name of the user.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
/*
const updateUserById = async (id, {
  firstName, lastName,
}) => {
  debugLog(`Updating user with id ${id}`, firstName, lastName );
  const updated = await userRepository.updateUserById(id,
    firstName, lastName,
  );

  if (!updated) {
    throw ServiceError.notFound(`No user with id ${id} exists`, { id });
  }

  return getById(id);
};
*/


// eslint-disable-next-line max-len
// Update the user with a new firstname and lastname, the new firstmane and lastname are passed in as parameters in the form of a json object
const updateUserById = async (id, {firstName, lastName}) => {
  debugLog(`Updating user with id ${id}`, firstName, lastName );
  const updated = await userRepository.updateUserById(id,
    firstName, lastName,
  );

  if (!updated) {
    throw ServiceError.notFound(`No user with id ${id} exists`, { id });
  }

  return getById(id);
};


/**
 * Delete an existing user.
 *
 * @param {string} id - Id of the user to delete.
 *
 * @throws {ServiceError} One of:
 * - NOT_FOUND: No user with the given id could be found.
 */
const deleteById = async (id) => {
  debugLog(`Deleting user with id ${id}`);
  const deleted = await userRepository.deleteById(id);

  if (!deleted) {
    throw ServiceError.notFound(`No user with id ${id} exists`, {
      id,
    });
  }
};

module.exports = {
  register,
  getAll,
  getById,
  updateUserById,
  deleteById,
};