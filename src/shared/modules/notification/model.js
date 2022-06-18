const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
sequelize = db.sequelize;
const User = require('../user/model');


const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.ENUM('PERSONAL', 'BY_USER_POSITION', 'BY_TYPE', 'GROUP')
  },
  typeNotification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
  },
  module: DataTypes.STRING,
},{
  tableName: "notifications",
  timestamps: true
})

// User.hasMany(Notification, {
//   foreignKey: 'userId'
// });

module.exports = Notification;