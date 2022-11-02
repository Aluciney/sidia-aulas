import { knex } from '../knex';

export const Matter = {
	findAll: async () => {
		return await knex('matter').orderBy('name');
	},
	findById: async (id: number) => {
		return await knex('user').where('id', id).first();
	},
	store: async ({ name }: { name: string }) => {
		return await knex('matter').insert({ name });
	},
	update: async ({ id, name }: { id: number, name: string }) => {
		return await knex('matter').update({ name }).where('id', id);
	},
	delete: async (id: number) => {
		await knex('schedule').delete().where('id_matter', id);
		await knex('matter_teacher').delete().where('id_matter', id);
		return await knex('matter')
			.delete()
			.where('id', id);
	}
};