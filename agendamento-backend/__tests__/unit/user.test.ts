import { describe, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { server_test } from '../../src/server_test';

describe('User', () => {
	it('should create a user', async () => {
		const response = await request(server_test)
			.post('/api/authentication/register')
			.send({
				name: faker.name.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			});
		expect(response.status).toBe(201);
	});
});