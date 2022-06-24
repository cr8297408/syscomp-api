const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const Facture = require('../facture/model');
const License = require('../license/model');
sequelize = db.sequelize;

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  repLegalContact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  municipality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contactDate: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
},{
  tableName: "clients",
  timestamps: true
})

Client.hasMany(Facture, {
  foreignKey: 'ClientId'
});

Client.hasMany(License, {
  foreignKey: 'ClientId'
});

module.exports = Client;