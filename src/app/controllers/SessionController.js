import jwt from 'jsonwebtoken';

import auth from '../../config/auth';
import CreateSessionService from '../services/session/CreateSessionService';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const user = await CreateSessionService.run({
        email,
        password,
      });
      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, auth.secret, {
          expiresIn: auth.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new SessionController();
