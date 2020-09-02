module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'deleted_at', Sequelize.DATE);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'deleted_at');
  },
};
