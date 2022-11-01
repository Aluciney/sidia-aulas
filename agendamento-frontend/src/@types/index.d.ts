interface User {
	id: number;
	name: string;
	email: string;
	password_hash: string;
	status: 'Y' | 'N';
	created_at: Date;
	updated_at: Date;
}

interface Schedule {
	id: number;
}