import { Op } from 'sequelize';
import Order from '../Models/Order';
import CreateOrderService from '../services/order/CreateOrderService';
import UpdateOrderService from '../services/order/UpdateOrderService';
import DeleteOrderService from '../services/order/DeleteOrderService';
import Client from '../Models/Client';
import Product from '../Models/Product';

class OrderController {
  async index(req, res) {
    try {
      const { id, page, limit } = req.query;
      const where = {};
      if (id) {
        where.id = {
          [Op.eq]: id,
        };
      }
      const allOrders = await Order.findAll({
        where: where || null,
        attributes: [
          'id',
          'total_value',
          'payment_date',
          'payment_method',
          'discount',
          'createdAt',
        ],
        include: [
          {
            model: Client,
            as: 'client',
            attributes: ['id', 'name', 'address'],
          },
          {
            model: Product,
            attributes: ['name', 'price', 'cost'],
            through: {
              attributes: ['price', 'quantity'],
            },
          },
        ],
        limit: limit && Number(limit),
        offset: page && (Number(page) - 1) * limit,
        order: [['id', 'ASC']],
      });

      const countOrders = await Order.count({
        where: where || null,
      });

      return res.status(200).json({
        count: countOrders,
        rows: allOrders,
      });
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
