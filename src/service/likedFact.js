const { getLogger } = require('../core/logging');
const likedFactRepository = require('../repository/likedFact');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all places.
 */
const getAll = async () => {
  debugLog('Fetching all places');
  const items = await likedFactRepository.findAll();

  return { items};
};



const findAllFromUserWithFact = async (userId) => {
  debugLog('Fetching all places');
  const items = await likedFactRepository.findAllFromUserWithFact(userId);

  return { items};
};

const findAllFromUserWithFactAndCategory = async (userId) => {
  debugLog('Fetching all places');
  const items = await likedFactRepository.findAllFromUserWithFactAndCategory(userId);

  return { items };
};






/**
 * Delete an existing place.
 *
 * @param {string} id - Id of the place to delete.
 */
//delete a likedFact, the likedFact is identified by the factId and the userId
const deleteById = async (userId, factId) => {
  debugLog(`Deleting likedFact with userId ${userId} and factId ${factId}`);
  await likedFactRepository.deleteById(userId, factId);
};



module.exports = {
  getAll,
  findAllFromUserWithFact,
  findAllFromUserWithFactAndCategory,
  deleteById,
};
