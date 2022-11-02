import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(ErrorMiddleware);

export { app as server_test };