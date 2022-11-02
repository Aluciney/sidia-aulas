import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('user_profile', function (table) {
			table.increments('id').unsigned().primary();
			table.integer('id_user', 10).unsigned().notNullable().references('id').inTable('user');
			table.integer('id_profile', 10).unsigned().notNullable().references('id').inTable('profile');
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('user_profile');
}