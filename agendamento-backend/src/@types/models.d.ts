interface User {
	id: number;
	name: string;
	email: string;
	password_hash: string;
	status: 'Y' | 'N';
	created_at: Date;
	updated_at: Date;
}
interface Teacher {
	id: number;
	
}
interface Schedule {
	id: number;
	id_user: number;
	id_matter_teacher: number;
	date: string;
	status: 'Y' | 'N';
	created_at: Date;
	updated_at: Date;
}
interface MatterTeacher {
	id: number;

}