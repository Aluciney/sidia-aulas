import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('profile').del();

	// Inserts seed entries
	await knex('profile').insert([
		{ name: 'Administrador' }
	]);
};
