const { DataTypes, Model, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
const Facture = require('../../../components/facture/model')
sequelize = db.sequelize;

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull:  false,
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull:  false
  },
  lastName: {
    type: DataTypes.STRING,
  },
  profile: DataTypes.JSON,
  isActive:  {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  typeUser: {
    type: DataTypes.STRING,
    defaultValue: "USER_READ"
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  avatarFile: DataTypes.STRING,
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedBy: {
    type: DataTypes.STRING,
  }
},{
  tableName: "users",
  timestamps: true
})

User.hasMany(Facture, {
  foreignKey: 'UserId'
});

module.exports = User;