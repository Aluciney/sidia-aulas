import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('matter').del();

	// Inserts seed entries
	await knex('matter').insert([
		{ name: 'Arquitetura de Dados' },
		{ name: 'Estrutura de Dados' },
		{ name: 'Princípios de Banco de Dados' },
		{ name: 'Empreendedorismo' },
		{ name: 'Inglês Técnico' },
	]);
};
