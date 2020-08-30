import { Router } from 'express';

import sessionRoutes from './sessions.routes';
import userRoutes from './user.routes';
import clientRoutes from './client.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/clients', clientRoutes);

export default routes;
