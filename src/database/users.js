const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    send_email: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = User;