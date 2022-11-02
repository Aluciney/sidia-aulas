import { knex } from '../knex';

export const Teacher = {
	findAll: async ({ where = {}, paginate }: { where?: any, paginate: { isLengthAware: boolean, perPage: number, currentPage: number } }) => {
		return await knex('teacher')
			.select([
				'teacher.id',
				'user.name',
				'user.email',
			])
			.join('user', 'teacher.id_user', 'user.id')
			.where(where)
			.orderBy('user.name')
			.paginate(paginate);
	},
	show: async (id: number) => {
		return await knex('teacher')
			.select([
				'teacher.id',
				'user.name',
				'user.email',
			])
			.join('user', 'teacher.id_user', 'user.id')
			.where('teacher.id', id)
			.first();
	},
	store: async ({ id_user }: { id_user: number }) => {
		return await knex('teacher')
			.insert({ id_user });
	},
	delete: async (id: number) => {
		await knex('matter_teacher').delete().where('id_teacher', id);
		return await knex('teacher')
			.delete()
			.where('id', id);
	}
};