const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
sequelize = db.sequelize;

const File = sequelize.define('File', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bytes: {
    type: DataTypes.FLOAT
  },
  storage: {
    type: DataTypes.ENUM('AWS', 'LOCAL', 'CLOUDINARY', 'OTHER'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('UNUSED', 'PROCESSING', 'OK'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: 'files',
  timestamps: true
})

module.exports = File;