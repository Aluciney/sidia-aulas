import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { ScheduleController } from './controllers/ScheduleController';
import { UserController } from './controllers/UserController';
import { AuthMiddleware } from './middlewares/AuthMiddleware';

const routes = Router();

routes.post('/authentication/login',  AuthController.login);
routes.post('/authentication/register',  AuthController.regiter);

routes.get('/schedules', [AuthMiddleware], ScheduleController.index);
routes.post('/schedules', [AuthMiddleware], ScheduleController.create);
routes.put('/schedules/:ID', [AuthMiddleware], ScheduleController.update);
routes.delete('/schedules/:ID', [AuthMiddleware], ScheduleController.delete);

routes.get('/users', [AuthMiddleware], UserController.index);
routes.put('/users/:ID', [AuthMiddleware], UserController.update);
routes.delete('/users/:ID', [AuthMiddleware], UserController.delete);

export { routes };