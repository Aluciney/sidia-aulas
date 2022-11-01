import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(ErrorMiddleware);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));