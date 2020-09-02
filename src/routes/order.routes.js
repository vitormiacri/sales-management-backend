import { Router } from 'express';

import OrderController from '../app/controllers/OrderController';
import validateOrder from '../app/validators/order/OrderStoreAndUpdate';

import authMiddleware from '../app/middlewares/auth';

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.post('/', validateOrder, OrderController.store);
orderRoutes.put('/:id', validateOrder, OrderController.update);
orderRoutes.delete('/:id', OrderController.delete);
orderRoutes.get('/', OrderController.index);

export default orderRoutes;
