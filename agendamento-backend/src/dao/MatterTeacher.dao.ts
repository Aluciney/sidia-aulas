import { knex } from '../knex';

export const MatterTeacher = {
	findAllTeacher: async ({ where }: { where: any }) => {
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
	findAllMatter: async ({ where = {} }: { where: any }) => {
		return await knex('matter_teacher')
			.select([
				'matter_teacher.id',
				'matter_teacher.id_matter',
				'matter.name'
			])
			.join('matter', 'matter_teacher.id_matter', 'matter.id')
			.where(where)
			.orderBy('matter.name');
	},
	store: async ({ id_matter, id_teacher }: { id_matter: number, id_teacher: number }) => {		
		return await knex('matter_teacher')
			.insert({
				id_matter, 
				id_teacher
			});
	},
	delete: async (id: number) => {
		return await knex('matter_teacher')
			.delete()
			.where('id', id);
	}
};