'use strict';
const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reportTypes', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.STRING,
        defaultValue: new Date(),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reportTypes');
  }
};
