import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { MatterController } from './controllers/MatterController';
import { MatterTeacherController } from './controllers/MatterTeacherController';
import { ScheduleController } from './controllers/ScheduleController';
import { TeacherController } from './controllers/TeacherController';
import { UserController } from './controllers/UserController';
import { AuthMiddleware } from './middlewares/AuthMiddleware';

const routes = Router();

routes.post('/authentication/login',  AuthController.login);
routes.post('/authentication/register',  UserController.store);

routes.get('/schedules', [AuthMiddleware], ScheduleController.index);
routes.post('/schedules', [AuthMiddleware], ScheduleController.store);
routes.put('/schedules/:ID', [AuthMiddleware], ScheduleController.update);
routes.delete('/schedules/:ID', [AuthMiddleware], ScheduleController.delete);

routes.get('/users', [AuthMiddleware], UserController.index);
routes.put('/users/:ID', [AuthMiddleware], UserController.update);
routes.delete('/users/:ID', [AuthMiddleware], UserController.delete);

routes.get('/matters', [AuthMiddleware], MatterController.index);
routes.post('/matters', [AuthMiddleware], MatterController.store);
routes.delete('/matters/:ID', [AuthMiddleware], MatterController.delete);

routes.get('/teachers', [AuthMiddleware], TeacherController.index);
routes.post('/teachers', [AuthMiddleware], TeacherController.store);
routes.delete('/teachers/:ID', [AuthMiddleware], TeacherController.delete);

routes.get('/matters_teacher', [AuthMiddleware], MatterTeacherController.index);

export { routes };