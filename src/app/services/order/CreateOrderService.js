import AppError from '../../../lib/app-error';
import Order from '../../Models/Order';
import Client from '../../Models/Client';
import Product from '../../Models/Product';

class CreateOrderService {
  async run({ order }) {
    const clientExist = await Client.findByPk(order.client_id);
    if (!clientExist) {
      throw new AppError('O cliente informado não existe!');
    }

    const updateStock = await this.updateStock(order.products);
    if (!updateStock) {
      throw new AppError(`Não há estoque de um ou mais produtos`);
    }

    const { products } = order;

    const orderCreated = await Order.create(order);

    for (const product of products) {
      const { id, price, quantity } = product;
      const findProduct = await Product.findByPk(id);
      await orderCreated.addProduct(findProduct, {
        through: {
          price,
          quantity,
        },
      });
    }
    const createdOrder = await Order.findByPk(orderCreated.id, {
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
          attributes: ['name', 'address'],
        },
        {
          model: Product,
          attributes: ['name', 'price', 'cost'],
          through: {
            attributes: ['price', 'quantity'],
          },
        },
      ],
    });

    return createdOrder;
  }

  async updateStock(products) {
    for (const product of products) {
      const { id, quantity } = product;
      const productFind = await Product.findByPk(id);
      const newQuantity = productFind.stock_amount - quantity;

      if (newQuantity < 0) {
        return false;
      }

      await productFind.update({ stock_amount: newQuantity });
    }
    return true;
  }
}

export default new CreateOrderService();
