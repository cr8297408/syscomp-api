'use strict';
const { UUIDV4, DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('nodes', {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      CostCenterId: {
        type: Sequelize.DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'costCenters',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      serial: {
        type: Sequelize.DataTypes.STRING,
      },
      initDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date()
      },
      finishDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      debit: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false
      },
      isLifetime: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('nodes');
  }
};
