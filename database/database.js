const Sequelize = require('sequelize');

const connection = new Sequelize('ciklo', 'root', 'xxxx', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
}) 

module.exports = connection;