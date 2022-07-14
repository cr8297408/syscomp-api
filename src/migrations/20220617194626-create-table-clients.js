'use strict';

const { UUIDV4, DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      businessName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      nit: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      repLegalContact: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      direction: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      municipality: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      contactDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date()
      },
      isActive:  {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('clients');
  }
};
