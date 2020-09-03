import { Model } from 'sequelize';

class OrdersProducts extends Model {
  static init(sequelize) {
    super.init({}, { sequelize, paranoid: true });

    return this;
  }
}

export default OrdersProducts;
