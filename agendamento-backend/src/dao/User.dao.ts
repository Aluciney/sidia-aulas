import { knex } from '../knex';
import bcrypt from 'bcrypt';

export const User = {
	findAll: async ({ paginate }: { paginate: { isLengthAware: boolean, perPage: number, currentPage: number } }) => {
		return await knex('user')
			.select([
				'id',
				'name',
				'email',
				'status',
			])
			.where('status', 'Y')
			.paginate(paginate);
	},
	findAllNoTeacher: async () => {
		return await knex('user')
			.select([
				'id',
				'name',
				'email',
				'status',
			])
			.where('status', 'Y')
			.andWhere('id', 'NOT IN', knex.raw('(SELECT t.id_user FROM teacher t)'));
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
		await knex('matter_teacher')
			.delete()
			.join('teacher', 'matter_teacher.id_teacher', 'teacher.id')
			.where('teacher.id_user', id);
		await knex('teacher').delete().where('id_user', id);
		return await knex('user')
			.update({
				status: 'N',
				updated_at: new Date()
			})
			.where('id', id);
	}
};