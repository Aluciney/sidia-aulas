import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('user_profile').del();

	// Inserts seed entries
	await knex('user_profile').insert([
		{ id_user: 1, id_profile: 1 }
	]);
};
