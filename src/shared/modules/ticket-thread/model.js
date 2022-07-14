const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
const SupportTicket = require('../support-ticket/model');
sequelize = db.sequelize;

const TicketThread = sequelize.define('TicketThread', {
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
  estate: {
    type: DataTypes.ENUM('OPEN', 'CLOSED'),
    defaultValue: 'OPEN'
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
  tableName: 'ticketThreads',
  timestamps: true
})

SupportTicket.hasMany(TicketThread, {
  foreignKey: 'SupportTicketId'
})

module.exports = TicketThread;