'use strict';

const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('factures', {
      id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
      },
      ClientId: {
        type: DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'clients',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      LicenseId: {
        type: DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'licenses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      UserId: {
        type: DataTypes.STRING,
        foreignkey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT
      },
      limitDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      rememberDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      paidOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      estate: {
        type: DataTypes.ENUM('PAID_OUT', 'IN_DEBT', 'PEDING')
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
    await queryInterface.dropTable('factures');
  }
};
