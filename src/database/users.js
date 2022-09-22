const Sequelize = require('sequelize');
const database = require('./db');
 
const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    send_email: Sequelize.BOOLEAN,
    allowNull: false
})
 
module.exports = User;