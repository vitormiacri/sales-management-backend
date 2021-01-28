import { Op } from 'sequelize';
import User from '../Models/User';
import CreateUserService from '../services/user/CreateUserService';
import UpdateUserService from '../services/user/UpdateUserService';
import DeleteUserService from '../services/user/DeleteUserService';

class UserController {
  async index(req, res) {
    try {
      const { name, id, page, limit } = req.query;
      const where = {};
      if (name) {
        where.name = {
          [Op.or]: {
            [Op.iLike]: `%${name}%`,
            [Op.substring]: name,
          },
        };
      }
      if (id) {
        where.id = id;
      }
      const allUsers = await User.findAndCountAll({
        where: where || null,
        limit: limit && Number(limit),
        offset: page && (Number(page) - 1) * limit,
        order: [['id', 'ASC']],
      });
      return res.status(201).json(allUsers);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

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
