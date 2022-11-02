import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('user').del();

	// Inserts seed entries
	await knex('user').insert([
		{ name: 'Adminitrador', email: 'admin.app@sidia.com', status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
		{ name: faker.name.fullName(), email: faker.internet.email(), status: 'Y', password_hash: '$2a$10$sC5/4RVq.e5h7F/.l4Zre.xnEyA6AbqvTb0QdTQjnHU2CBVJKfeJK' },
	]);
};