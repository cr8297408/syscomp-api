const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const Payment = require('../payment/model');
sequelize = db.sequelize;

const Facture = sequelize.define('Facture', {
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
  observation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
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
    type: DataTypes.ENUM('PAID_OUT', 'IN_DEBT', 'PENDING'),
    defaultValue: 'PENDING'
  }
},{
  tableName: "factures",
  timestamps: true
})

Facture.hasMany(Payment, {
  foreignKey: 'FactureId'
})

module.exports = Facture;