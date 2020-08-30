import AppError from '../../../lib/app-error';
import Client from '../../Models/Client';

class CreateClientService {
  async run({ client }) {
    const clientExists = await Client.findOne({ where: { name: client.name } });

    if (clientExists) {
      throw new AppError('Este cliente já existe!');
    }

    const { id, name, address } = await Client.create(client);

    return {
      id,
      name,
      address,
    };
  }
}

export default new CreateClientService();
