import { knex } from '../knex';

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
	update: async ({ id, id_matter_teacher, date }: { id: number, id_matter_teacher: number, date: string }) => {
		return await knex('schedule')
			.update({
				id_matter_teacher, 
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