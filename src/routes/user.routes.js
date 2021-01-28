import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import validateUserStore from '../app/validators/user/UserStore';
import validateUserUpdate from '../app/validators/user/UserUpdate';

import authMiddleware from '../app/middlewares/auth';

const userRoutes = Router();

userRoutes.post('/', validateUserStore, UserController.store);

userRoutes.use(authMiddleware);

userRoutes.delete('/:id', UserController.delete);
userRoutes.put('/', validateUserUpdate, UserController.update);
userRoutes.get('/', UserController.index);

export default userRoutes;
