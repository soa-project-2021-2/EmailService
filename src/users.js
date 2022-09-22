const Sequelize = require('sequelize');
const database = require('./db');
 
const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    send_email: Sequelize.BOOLEAN,
})
 
module.exports = User;