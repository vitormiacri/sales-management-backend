import Client from '../../Models/Client';

class DeleteClientService {
  async run({ clientId }) {
    const client = await Client.findByPk(clientId);

    if (!client) {
      throw new Error('Cliente não encontrado.');
    }

    await client.destroy();

    return true;
  }
}

export default new DeleteClientService();
