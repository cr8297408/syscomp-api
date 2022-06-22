'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('eventUser', {
      UserId: {
        type: DataTypes.STRING,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      EventId: {
        type: DataTypes.STRING,
        references: {
          model: 'events', 
          key: 'id'
        }
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
    await queryInterface.dropTable('eventUser');
  }
};
