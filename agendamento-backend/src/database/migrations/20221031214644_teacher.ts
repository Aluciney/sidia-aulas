import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('teacher', function (table) {
			table.increments('id').unsigned().primary();
			table.integer('id_user', 10).unsigned().notNullable().unique().references('id').inTable('user');
			table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('teacher');
}