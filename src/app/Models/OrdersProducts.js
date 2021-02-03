import { Model, Sequelize } from 'sequelize';

class OrdersProducts extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.DECIMAL(5, 2),
        quantity: Sequelize.INTEGER,
      },
      { sequelize, paranoid: true }
    );

    return this;
  }
}

export default OrdersProducts;
