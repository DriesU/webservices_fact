const { getLogger } = require('../core/logging');
const ServiceError = require('../core/serviceError');
const factRepository = require('../repository/fact');

//const userService = require('./user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all transactions.
 */
const getAll = async () => {
  debugLog('Fetching all facts');
  const items = await factRepository.findAll();
  //const count = await factRepository.findAll();
  return {
    items,

  };
};

/**
 * Get the transaction with the given `id`.
 *
 * @param {number} id - Id of the transaction to find.
 */
const getById = async (id) => {
  debugLog(`Fetching fact with id ${id}`);
  const transaction = await factRepository.findById(id);

  if (!transaction) {
    throw ServiceError.notFound(`There is no fact with id ${id}`, { id });
  }

  return transaction;
};

/**
 * Create a new transaction, will create a new place if necessary.
 *
 * @param {object} transaction - The transaction to create.
 * @param {number} transaction.amount - Amount deposited/withdrawn.
 * @param {Date} transaction.date - Date of the transaction.
 * @param {string} transaction.placeId - Id of the place the transaction happened.
 * @param {string} transaction.user - Name of the user who did the transaction.
 */
const create = async ({fact, categoryId}) => {
  debugLog('Creating new fact', { fact, categoryId});

  // For now simply create a new user every time
  // const userId = await userService.register({ name: user });

  const id = await factRepository.create({
    fact,
    categoryId,
  });
  return getById(id);
};

/**
 * Update an existing transaction, will create a new place if necessary.
 *
 * @param {number} id - Id of the transaction to update.
 * @param {object} transaction - The transaction data to save.
 * @param {number} [transaction.amount] - Amount deposited/withdrawn.
 * @param {Date} [transaction.date] - Date of the transaction.
 * @param {string} [transaction.placeId] - Id of the place the transaction happened.
 * @param {string} [transaction.user] - Name of the user who did the transaction.
 */
const updateById = async (id, {fact, categoryId }) => {
  debugLog(`Updating fact with id ${id}`, {
    fact,
    categoryId,
  });

  // For now simply create a new user every time
  //const userId = await userService.register({ name: user });

  await factRepository.updateById(id, {
    fact,
    categoryId,
  });
  return getById(id);
};

/**
 * Delete the transaction with the given `id`.
 *
 * @param {number} id - Id of the transaction to delete.
 */
const deleteById = async (id) => {
  debugLog(`Deleting fact with id ${id}`);
  await factRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
