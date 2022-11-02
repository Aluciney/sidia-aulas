import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('matter', function (table) {
			table.increments('id').unsigned().primary();
			table.string('name').notNullable();
			table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
			table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('matter');
}