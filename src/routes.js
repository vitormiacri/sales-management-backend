import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import validateSessionStore from './app/validators/sessions/SessionStore';

import UserController from './app/controllers/UserController';
import validateUserStore from './app/validators/user/UserStore';
import validateUserUpdate from './app/validators/user/UserUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

export default routes;
