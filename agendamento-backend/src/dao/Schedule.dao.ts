import { knex } from '../knex';
import bcrypt from 'bcrypt';

export const Schedule = {
	findAll: async ({ paginate }: { paginate: { isLengthAware: boolean, perPage: number, currentPage: number } }) => {
		return await knex('schedule').paginate(paginate);
	},
	findById: async (id: number) => {
		return await knex('schedule').where('id', id).first();
	},
	store: async ({ id_user, id_matter_teacher, date }: { id_user: number, id_matter_teacher: number, date: string }) => {	
		return await knex('schedule')
			.insert({
				id_user, 
				id_matter_teacher, 
				date
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
		return await knex('schedule')
			.delete()
			.where('id', id);
	}
};