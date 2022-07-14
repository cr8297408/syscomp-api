'use strict';
const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('supportTickets', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      TypeTicketId: {
        type: DataTypes.STRING,
        references: {
          model: 'reportTypes', 
          key: 'id'
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId:{
        type: DataTypes.STRING,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estate: {
        type: DataTypes.ENUM('REVIEWED', 'PENDING', 'WAIT', 'CLOSED'),
        defaultValue: 'PENDING'
      },
      priority: {
        type: DataTypes.ENUM('HIGH', 'MEDIUM', 'LOW'),
        defaultValue: 'LOW'
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('supportTickets');
  }
};
