import { knex } from 'knex';

declare module 'knex/types/tables' {
	interface Tables {
		'user': User;
		'teacher': Teacher;
		'schedule': Schedule;
		'matter_teacher': MatterTeacher;
	}
}

declare module 'express' {
	export interface Request {
		user?: User;
	}
}
