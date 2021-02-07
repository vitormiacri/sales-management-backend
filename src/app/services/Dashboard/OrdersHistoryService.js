import Client from '../../Models/Client';
import Order from '../../Models/Order';

class OrderHistoryService {
  async run() {
    const result = await Order.findAll({
      attributes: ['id', 'total_value', 'createdAt'],
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['name'],
        },
      ],
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    return result;
  }
}

export default new OrderHistoryService();
