const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const CostCenter = require('../cost-center/model')
sequelize = db.sequelize;

const Node = sequelize.define('Node', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  serial: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4
  },
  initDate: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  finishDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  debit: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  isLifetime: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},{
  tableName: 'nodes',
  timestamps: true
})

CostCenter.hasMany(Node, {
  foreignKey: 'CostCenterId'
});

module.exports = Node;