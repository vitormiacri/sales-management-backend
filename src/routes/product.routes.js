import { Router } from 'express';

import ProductController from '../app/controllers/ProductController';
import validateProductStore from '../app/validators/product/ProductStore';
import validateProductUpdate from '../app/validators/product/ProductUpdate';

import authMiddleware from '../app/middlewares/auth';

const productRoutes = Router();

productRoutes.use(authMiddleware);

productRoutes.post('/', validateProductStore, ProductController.store);
productRoutes.put('/:id', validateProductUpdate, ProductController.update);
productRoutes.delete('/:id', ProductController.delete);
productRoutes.get('/', ProductController.index);

export default productRoutes;
