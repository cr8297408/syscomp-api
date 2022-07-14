const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const Facture = require('../facture/model');
sequelize = db.sequelize;

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  sum: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
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
},{
  tableName: 'items',
  timestamps: true
})

Facture.hasMany(Item, {
  foreignKey: 'FactureId'
})

module.exports = Item;