const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
sequelize = db.sequelize;

const CostCenter = sequelize.define('CostCenter', {
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
  serial_license: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isLifetime: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: "costCenters",
  timestamps: true
})

module.exports = CostCenter;