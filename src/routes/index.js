import { Router } from 'express';

import sessionRoutes from './sessions.routes';
import userRoutes from './user.routes';
import clientRoutes from './client.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/clients', clientRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);

export default routes;
