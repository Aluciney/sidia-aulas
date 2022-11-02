import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('teacher').del();

	// Inserts seed entries
	await knex('teacher').insert([
		{ id_user: 2 },
		{ id_user: 3 },
		{ id_user: 4 },
		{ id_user: 5 },
		{ id_user: 6 },
		{ id_user: 7 },
		{ id_user: 8 },
		{ id_user: 9 },
		{ id_user: 10 },
	]);
};