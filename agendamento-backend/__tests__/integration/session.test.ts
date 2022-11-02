import { describe, expect, it } from '@jest/globals';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { server_test } from '../../src/server_test';

const email = 'admin.app@sidia.com';
const password = '12345678';

describe('Authentication', () => {
	it('should authenticate with valid credentials', async () => {
		const response = await request(server_test)
			.post('/api/authentication/login')
			.send({
				email, password
			});

		expect(response.status).toBe(200);
	});

	it('should not authenticate with invalid credentials', async () => {
		const email_faker = faker.internet.email();
		const password_faker = faker.internet.password();

		const response = await request(server_test)
			.post('/api/authentication/login')
			.send({
				email: email_faker,
				password: password_faker
			});

		expect(response.status).toBe(401);
	});

	it('should return jwt token when authenticated', async () => {
		const response = await request(server_test)
			.post('/api/authentication/login')
			.send({
				email,
				password
			});

		expect(response.body).toHaveProperty('token');
	});
});
