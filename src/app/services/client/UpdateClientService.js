import Client from '../../Models/Client';

class UpdateClientService {
  async run({ client, clientId }) {
    const findClient = await Client.findByPk(clientId);

    const { id, name, address } = await findClient.update(client);

    return {
      id,
      name,
      address,
    };
  }
}

export default new UpdateClientService();
