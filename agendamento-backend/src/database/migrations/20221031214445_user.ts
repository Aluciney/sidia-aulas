import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('user', function (table) {
			table.increments('id').unsigned().primary();
			table.string('name', 50).notNullable();
			table.string('email', 50).notNullable().unique();
			table.string('password_hash', 200).notNullable();
			table.enum('status', ['Y', 'N']).notNullable().defaultTo('Y');
			table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
			table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('user');
}