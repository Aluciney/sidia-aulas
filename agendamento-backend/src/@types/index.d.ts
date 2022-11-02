import { knex } from 'knex';

declare module 'knex/types/tables' {
	interface Tables {
		'user': User;
		'teacher': Teacher;
		'matter': Matter;
		'schedule': Schedule;
		'matter_teacher': MatterTeacher;
	}
}

interface ProfileAuth {
	id: number;
	id_user: number;
	id_profile: number;
	name_user: string;
	email_user: string;
	name_profile: string;
}

declare module 'express' {
	export interface Request {
		user?: User;
		profile?: ProfileAuth;
	}
}
