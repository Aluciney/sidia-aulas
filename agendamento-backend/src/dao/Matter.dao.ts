import { knex } from '../knex';
import bcrypt from 'bcrypt';

export const Matter = {
	findAll: async () => {
		return await knex('matter').orderBy('name');
	},
	findById: async (id: number) => {
		return await knex('user').where('id', id).first();
	},
	store: async ({ name, email, password }: { name: string, email: string, password: string }) => {		
		return await knex('user')
			.insert({
				name, 
				email, 
				password_hash: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
			});
	},
	update: async ({ id, name, email, password }: { id: number, name: string, email: string, password: string }) => {
		return await knex('user')
			.update({
				name, 
				email, 
				password_hash: password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : undefined,
				updated_at: new Date()
			})
			.where('id', id);
	},
	delete: async (id: number) => {
		return await knex('user')
			.update({
				status: 'N',
				updated_at: new Date()
			})
			.where('id', id);
	}
};