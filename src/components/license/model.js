const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../config/connection/connectBd');
const CostCenter = require('../cost-center/model');
const Facture = require('../facture/model');
sequelize = db.sequelize;

const License = sequelize.define('License', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  serial: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
  },
  type: {
    type: DataTypes.ENUM('SERVER', 'CLIENT', 'MASTER'),
    default: 'SERVER'
  },
  description: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  expired_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isLifetime: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},{
  tableName: 'licenses',
  timestamps: true
})

License.hasMany(Facture, {
  foreignKey: 'LicenseId'
});

License.hasMany(CostCenter,{
  foreignKey: 'LicenseId'
})

module.exports = License;