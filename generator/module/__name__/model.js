<<<<<<< HEAD
const { DataTypes, Model, UUIDV4} = require('sequelize');
=======
const { DataTypes, UUIDV4} = require('sequelize');
>>>>>>> development
const db = require('../../config/connection/connectBd');
sequelize = db.sequelize;

const __name__ = sequelize.define('__name__', {
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
  tableName: __name__s,
  timestamps: true
})

module.exports = __name__;