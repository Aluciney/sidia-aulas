import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('schedule', function (table) {
			table.increments('id').unsigned().primary();
			table.integer('id_user', 10).unsigned().notNullable().references('id').inTable('user');
			table.integer('id_matter_teacher', 10).unsigned().notNullable().references('id').inTable('matter_teacher');
			table.date('date').notNullable();
			table.enum('status', ['Y', 'N']).notNullable().defaultTo('Y');
			table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
			table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('schedule');
}