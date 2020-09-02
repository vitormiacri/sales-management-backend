import Order from '../../Models/Order';

class DeleteOrderService {
  async run({ orderId }) {
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    await order.destroy();

    return true;
  }
}

export default new DeleteOrderService();
