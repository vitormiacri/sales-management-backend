import AppError from '../../../lib/app-error';
import Order from '../../Models/Order';
import Client from '../../Models/Client';

class CreateOrderService {
  async run({ order }) {
    const clientExist = await Client.findByPk(order.client_id);

    if (!clientExist) {
      throw new AppError('O cliente informado não existe!');
    }

    const { id } = await Order.create(order);

    const createdOrder = await Order.findByPk(id, {
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['name', 'address'],
        },
      ],
    });

    return createdOrder;
  }
}

export default new CreateOrderService();
