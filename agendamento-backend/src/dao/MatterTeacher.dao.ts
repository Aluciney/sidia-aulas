import { knex } from '../knex';
import bcrypt from 'bcrypt';

export const MatterTeacher = {
	findAll: async ({ where }: { where: any }) => {
		return await knex('matter_teacher')
			.select([
				'user.id',
				'user.name',
				'user.email',
			])
			.join('teacher', 'matter_teacher.id_teacher', 'teacher.id')
			.join('user', 'teacher.id_user', 'user.id')
			.where(where)
			.orderBy('user.name');
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