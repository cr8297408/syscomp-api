const { DataTypes, UUIDV4} = require('sequelize');
const db = require('../../../config/connection/connectBd');
const User = require('../user/model');
const Event = require('./model');
sequelize = db.sequelize;

const EventUser = sequelize.define('EventUser', {
  UserId: {
    type: DataTypes.STRING,
    references: {
      model: User, 
      key: 'id'
    }
  },
  EventId: {
    type: DataTypes.STRING,
    references: {
      model: User, 
      key: 'id'
    }
  },
},{
  tableName: 'eventUser',
  timestamps: true
})

User.belongsToMany(Event, { through: EventUser });
Event.belongsToMany(User, { through: EventUser });

module.exports = EventUser;