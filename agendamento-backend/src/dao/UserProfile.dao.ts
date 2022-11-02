import { knex } from '../knex';

export const UserProfile = {
	findAll: async ({ where }: { where: any }) => {
		return await knex('user_profile')
			.select([
				'user_profile.id',
				'user_profile.id_user',
				'user_profile.id_profile',
				'user.name AS name_user',
				'user.email AS email_user',
				'profile.name AS name_profile',
			])
			.join('user','user_profile.id_user', 'user.id')
			.join('profile','user_profile.id_profile', 'profile.id')
			.where(where)
			.orderBy('user.name');
	},
	findByIdUser: async (id_user: number) => {
		return await knex('user_profile')
			.select([
				'user_profile.id',
				'user_profile.id_user',
				'user_profile.id_profile',
				'user.name AS name_user',
				'user.email AS email_user',
				'profile.name AS name_profile',
			])
			.join('user','user_profile.id_user', 'user.id')
			.join('profile','user_profile.id_profile', 'profile.id')
			.where('user.id', id_user)
			.first();
	},
	store: async ({ id_user, id_profile }: { id_user: number, id_profile: number }) => {		
		return await knex('user_profile')
			.insert({
				id_user,
				id_profile
			});
	},
	delete: async (id: number) => {
		return await knex('user_profile')
			.delete()
			.where('id', id);
	}
};