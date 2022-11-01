import * as dotenv from 'dotenv';
dotenv.config();
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
	development: {
		client: process.env.DB_DIALECT_DEV,
		connection: {
			host: process.env.DB_HOST_DEV,
			database: process.env.DB_NAME_DEV,
			user: process.env.DB_USER_DEV,
			password: process.env.DB_PASS_DEV,
			port: Number(process.env.DB_PORT_DEV),
			charset: 'utf8'
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: 'src/database/migrations',
		},
		seeds: {
			directory: 'src/database/seeds'
		}
	},
	test: {
		client: process.env.DB_DIALECT_TEST,
		connection: {
			host: process.env.DB_HOST_TEST,
			database: process.env.DB_NAME_TEST,
			user: process.env.DB_USER_TEST,
			password: process.env.DB_PASS_TEST,
			port: Number(process.env.DB_PORT_TEST),
			charset: 'utf8'
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: 'src/database/migrations',
		},
		seeds: {
			directory: 'src/database/seeds'
		}
	}
};

export default config;