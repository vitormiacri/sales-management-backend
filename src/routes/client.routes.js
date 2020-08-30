import { Router } from 'express';

import ClientController from '../app/controllers/ClientController';
import validateClientStore from '../app/validators/client/ClientStore';
import validateClientUpdate from '../app/validators/client/ClientUpdate';

import authMiddleware from '../app/middlewares/auth';

const clientRoutes = Router();

clientRoutes.use(authMiddleware);

clientRoutes.post('/', validateClientStore, ClientController.store);
clientRoutes.put('/:id', validateClientUpdate, ClientController.update);
clientRoutes.delete('/:id', ClientController.delete);
clientRoutes.get('/', ClientController.index);

export default clientRoutes;
