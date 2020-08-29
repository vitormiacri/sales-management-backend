import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserService';
import DeleteUserService from '../services/user/DeleteUserService';

class UserController {
  async store(req, res) {
    try {
      const user = await CreateUserService.run({
        user: req.body,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const user = UpdateUserService.run({
        user: req.body,
        sessionUserId: req.userId,
      });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeleteUserService.run({
        userId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserController();
