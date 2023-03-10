/* eslint-disable indent */
/* eslint-disable no-tabs */
const {
	tables,
} = require('..');

module.exports = {
	up: async (knex) => {
		await knex.schema.alterTable(tables.user, (table) => {
			table.string('auth0id', 255);
		});
	},
	down: (knex) => {
		return knex.schema.dropTableIfExists(tables.user);
	},
};