import * as dotenv from 'dotenv';
dotenv.config();

import Knex  from 'knex';
import { attachPaginate } from 'knex-paginate';
attachPaginate();

import config from '../../knexfile';

type ENVIRONMENT = 'test' | 'development' | undefined;
const environment = process.env.NODE_ENV as ENVIRONMENT || 'development';
const configEnv = config[environment];

const knex = Knex(configEnv);

export { knex };
