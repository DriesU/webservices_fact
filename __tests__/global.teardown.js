const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.fact).delete();
  await getKnex()(tables.user).delete();
  await getKnex()(tables.likedFact).delete();

  // Close database connection
  await shutdownData();
};