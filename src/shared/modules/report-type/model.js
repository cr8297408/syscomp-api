const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
sequelize = db.sequelize;

const ReportType = sequelize.define('ReportType', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  tableName: "reportTypes",
  timestamps: true
})

module.exports = ReportType;