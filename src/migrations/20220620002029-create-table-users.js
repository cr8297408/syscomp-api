'use strict';

const { DataTypes, UUIDV4} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull:  false,
        unique: true
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull:  false
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
      },
      profile: Sequelize.DataTypes.JSON,
      isActive:  {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      typeUser: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "USER_READ"
      },
      isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
      avatarFile: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable('users');
  }
};
