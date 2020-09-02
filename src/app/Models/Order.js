import { Model, Sequelize } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        total_value: Sequelize.DECIMAL(5, 2),
        payment_date: Sequelize.DATE,
        payment_method: Sequelize.STRING,
        discount: Sequelize.INTEGER,
      },
      { sequelize, paranoid: true }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
  }
}

export default Order;
