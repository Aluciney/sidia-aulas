import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('profile', function (table) {
			table.increments('id').unsigned().primary();
			table.string('name', 50).notNullable();
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('profile');
}