interface User {
	id: number;
	name: string;
	email: string;
	password_hash: string;
	status: 'Y' | 'N';
	created_at: Date;
	updated_at: Date;
	profile: ProfileAuth | null;
}

interface Schedule {
	id: number;
}

interface Matter {
	id: number;
	name: string;
}

interface Teacher {
	id: number;
	id_user: number;
}

interface MatherTeacher {
	id: number;
	id_matter: number;
	id_teacher: number;
}

interface MatherTeacherJoin {
	id: number;
	name: string;
	email: string;
}

interface ProfileAuth {
	id: number;
	id_user: number;
	id_profile: number;
	name_user: string;
	email_user: string;
	name_profile: string;
}