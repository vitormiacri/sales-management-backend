import CreateClientService from '../services/client/CreateClientService';
import UpdateClientService from '../services/client/UpdateClientService';
import DeleteUserService from '../services/client/DeleteClientService';

class ClientController {
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
      await DeleteUserService.run({
        userId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ClientController();
