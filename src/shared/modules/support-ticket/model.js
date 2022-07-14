const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
const TypeTicket = require('../report-type/model');
const User = require('../user/model');
sequelize = db.sequelize;

const SupportTicket = sequelize.define('SupportTicket', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estate: {
    type: DataTypes.ENUM('REVIEWED', 'PENDING', 'WAIT', 'CLOSED'),
    defaultValue: 'PENDING'
  },
  priority: {
    type: DataTypes.ENUM('HIGH', 'MEDIUM', 'LOW'),
    defaultValue: 'LOW'
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
  tableName: 'supportTickets',
  timestamps: true
})

TypeTicket.hasMany(SupportTicket, {
  foreignKey: 'TypeTicketId'
})

User.hasMany(SupportTicket, {
  foreignKey: 'UserId'
})

module.exports = SupportTicket;