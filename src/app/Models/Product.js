import { Model, Sequelize } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL(5, 2),
        cost: Sequelize.DECIMAL(5, 2),
        quantity: Sequelize.INTEGER,
        stock_amount: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Order, { through: models.OrdersProducts });
  }
}

export default Product;
