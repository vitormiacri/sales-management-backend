import AppError from '../../../lib/app-error';
import Order from '../../Models/Order';
import Client from '../../Models/Client';
import Product from '../../Models/Product';

class CreateOrderService {
  async run({ order }) {
    const orderExist = await Order.findByPk(order.client_id);

    if (!orderExist) {
      throw new AppError('O cliente informado não existe!');
    }

    const orderCreated = await Order.create(order);

    await orderCreated.addProducts(order.products);

    const createdOrder = await Order.findByPk(orderCreated.id, {
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['name', 'address'],
        },
        {
          model: Product,
          attributes: ['name', 'price', 'cost'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return createdOrder;
  }
}

export default new CreateOrderService();
