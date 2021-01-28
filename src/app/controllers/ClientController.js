import { Op } from 'sequelize';
import Client from '../Models/Client';
import CreateClientService from '../services/client/CreateClientService';
import UpdateClientService from '../services/client/UpdateClientService';
import DeleteClientService from '../services/client/DeleteClientService';

class ClientController {
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
      const allClients = await Client.findAndCountAll({
        where: where || null,
        limit: limit && Number(limit),
        offset: page && (Number(page) - 1) * limit,
        order: [['id', 'ASC']],
      });
      return res.status(201).json(allClients);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const client = await CreateClientService.run({
        client: req.body,
      });

      return res.status(201).json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const client = await UpdateClientService.run({
        client: req.body,
        clientId: req.params.id,
      });

      return res.status(201).json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeleteClientService.run({
        clientId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ClientController();
