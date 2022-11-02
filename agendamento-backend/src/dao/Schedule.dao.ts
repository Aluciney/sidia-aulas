import { knex } from '../knex';

export const Schedule = {
	findAll: async ({ paginate, where = {} }: { paginate: { isLengthAware: boolean, perPage: number, currentPage: number }, where?: any }) => {
		return await knex('schedule')
			.select([
				'schedule.id',
				'user.name AS name_user',
				'user.email AS email_user',
				'teacher_user.name AS name_teacher',
				'teacher_user.email AS email_teacher',
				'matter.name AS name_matter',
				'schedule.date',
				'schedule.status',
				'schedule.created_at',
			])
			.join('user', 'schedule.id_user', 'user.id')
			.join('matter', 'schedule.id_matter', 'matter.id')
			.join('teacher', 'schedule.id_teacher', 'teacher.id')
			.join('user AS teacher_user', 'teacher.id_user', 'teacher_user.id')
			.where(where)
			.paginate(paginate);
	},
	findById: async (id: number) => {
		return await knex('schedule').where('id', id).first();
	},
	store: async ({ id_user, id_matter, id_teacher, date }: { id_user: number, id_matter: number, id_teacher: number, date: string }) => {	
		return await knex('schedule')
			.insert({
				id_user, 
				id_matter, 
				id_teacher, 
				date
			});
	},
	update: async ({ id, id_matter, id_teacher, date }: { id: number, id_matter: number, id_teacher: number, date: string }) => {
		return await knex('schedule')
			.update({
				id_matter, 
				id_teacher, 
				date,
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