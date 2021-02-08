import { Router } from 'express';

import DashboardController from '../app/controllers/DashboardController';

import authMiddleware from '../app/middlewares/auth';

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.get('/sumaryOrdersValue', DashboardController.totalOrdersSumary);
orderRoutes.get('/ordersHistory', DashboardController.ordersHistory);
orderRoutes.get('/totalValueGraph', DashboardController.totalValueGraph);
orderRoutes.get('/totalCountGraph', DashboardController.totalCountGraph);

export default orderRoutes;
