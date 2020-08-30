import { Model, Sequelize } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Client;
