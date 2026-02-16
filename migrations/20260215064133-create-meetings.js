'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meetings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()')
      }
    });

    await queryInterface.addIndex('meetings', ['userId', 'startTime']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('meetings');
  }
};
