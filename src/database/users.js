const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    send_email: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = User;