module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        allowNull: true,
      },
      total_value: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
