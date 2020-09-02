import Order from '../../Models/Order';
import AppError from '../../../lib/app-error';

class UpdateOrderService {
  async run({ order, orderId }) {
    const findOrder = await Order.findByPk(orderId);

    if (!findOrder) {
      throw new AppError('Pedido não encontrado');
    }

    const {
      id,
      total_value,
      payment_date,
      payment_method,
      discount,
      client_id,
    } = await findOrder.update(order);

    const { name, address } = await findOrder.getClient();

    return {
      id,
      total_value,
      payment_date,
      payment_method,
      discount,
      client_id,
      client: { name, address },
    };
  }
}

export default new UpdateOrderService();
