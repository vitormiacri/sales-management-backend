import { Op } from 'sequelize';
import Order from '../Models/Order';
import CreateOrderService from '../services/order/CreateOrderService';
import UpdateOrderService from '../services/order/UpdateOrderService';
import DeleteOrderService from '../services/order/DeleteOrderService';
import Client from '../Models/Client';

class OrderController {
  async index(req, res) {
    try {
      const { client_id } = req.query;
      const where = {};
      if (client_id) {
        where.client_id = {
          [Op.eq]: client_id,
        };
      }
      const allOrders = await Order.findAndCountAll({
        where: where || null,
        include: {
          model: Client,
          as: 'client',
        },
      });
      return res.status(201).json(allOrders);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const order = await CreateOrderService.run({
        order: req.body,
      });

      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const order = await UpdateOrderService.run({
        order: req.body,
        orderId: req.params.id,
      });

      return res.status(201).json(order);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await DeleteOrderService.run({
        orderId: req.params.id,
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new OrderController();
