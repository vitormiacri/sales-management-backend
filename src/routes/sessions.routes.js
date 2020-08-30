import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';
import validateSessionStore from '../app/validators/sessions/SessionStore';

const sessionsRoutes = Router();

sessionsRoutes.post('/', validateSessionStore, SessionController.store);

export default sessionsRoutes;
