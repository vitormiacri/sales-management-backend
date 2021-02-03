module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'orders_products',
        'quantity',
        Sequelize.INTEGER
      ),
      queryInterface.addColumn(
        'orders_products',
        'price',
        Sequelize.DECIMAL(5, 2)
      ),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('orders_products', 'quantity'),
      queryInterface.removeColumn('orders_products', 'price'),
    ]);
  },
};
