'use strict';

const {DataTypes, UUIDV4} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('licenses', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      serial: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: Sequelize.DataTypes.ENUM('SERVER', 'CLIENT', 'MASTER'),
        default: 'SERVER'
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date()
      },
      expired_date: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      ClientId: {
        type: Sequelize.DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'clients',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      isLifetime: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      updatedBy: {
        type: DataTypes.STRING,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('licenses');
  }
};
