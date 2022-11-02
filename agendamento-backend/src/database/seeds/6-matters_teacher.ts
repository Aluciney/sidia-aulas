import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('matter_teacher').del();

	// Inserts seed entries
	await knex('matter_teacher').insert([
		{ id_matter: 1, id_teacher: 1 },
		{ id_matter: 1, id_teacher: 2 },
		{ id_matter: 1, id_teacher: 4 },
		{ id_matter: 1, id_teacher: 5 },
		{ id_matter: 1, id_teacher: 7 },
		{ id_matter: 2, id_teacher: 3 },
		{ id_matter: 2, id_teacher: 4 },
		{ id_matter: 2, id_teacher: 6 },
		{ id_matter: 2, id_teacher: 8 },
		{ id_matter: 3, id_teacher: 1 },
		{ id_matter: 3, id_teacher: 3 },
		{ id_matter: 3, id_teacher: 6 },
		{ id_matter: 3, id_teacher: 9 },
		{ id_matter: 4, id_teacher: 2 },
		{ id_matter: 4, id_teacher: 5 },
		{ id_matter: 4, id_teacher: 7 },
		{ id_matter: 4, id_teacher: 9 },
		{ id_matter: 5, id_teacher: 1 },
		{ id_matter: 5, id_teacher: 3 },
	]);
};