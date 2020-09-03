import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/Models/User';
import Client from '../app/Models/Client';
import Product from '../app/Models/Product';
import Order from '../app/Models/Order';
import OrdersProducts from '../app/Models/OrdersProducts';

const models = [User, Client, Product, Order, OrdersProducts];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
