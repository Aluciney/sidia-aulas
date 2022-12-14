import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('matter_teacher', function (table) {
			table.increments('id').unsigned().primary();
			table.integer('id_matter', 10).unsigned().notNullable().references('id').inTable('matter');
			table.integer('id_teacher', 10).unsigned().notNullable().references('id').inTable('teacher');
			table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('matter_teacher');
}