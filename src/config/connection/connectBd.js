var Sequelize = require('sequelize');
const config = require('../env');
const { Umzug, SequelizeStorage } = require('umzug');

var sequelize = new Sequelize(config.DB_NAME,
    config.DB_USER,
    config.DB_PASS, 
    {
        host: config.DB_HOST,
        dialect: 'mysql',
    }
);

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;