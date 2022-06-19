'use strict';
const { UUIDV4, DataTypes } = require('sequelize');


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('costCenters', { 
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      LicenseId: {
        type: Sequelize.DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'licenses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      serial: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      initDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
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
      direction: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nodes: {
        type: Sequelize.DataTypes.JSON
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
        type: Sequelize.Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('costCenters');
  }
};
