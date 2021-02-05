const Sequelize = require('sequelize');

const connect = new Sequelize('guiapress', 'root', 'xxxx', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
}) 

module.exports = connect;