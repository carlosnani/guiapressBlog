const Sequelize = require('sequelize');

const connect = new Sequelize('guiapress', 'root', 'xxxx', {
    host: 'localhost',
    dialect: 'mysql',
}) 

module.exports = connect;