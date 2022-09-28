const database = require('./db');
const User = require('./users');

async function createUser(id, name, email, send_email) {
    try {
        await database.sync();
        const resultadoCreate = await User.create({
            id: id,
            name: name,
            email: email,
            send_email: send_email
        })
        console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(id) {
    try {
        await database.sync();
        const user = await User.findByPk(id);
        if (user === null) {
            console.log("User not found!");
        } else {
            return user.dataValues;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getUsers() {
    try {
        await database.sync();
        const users = await User.findAll({
            where: {
                send_email: 1
            }
        });
        return users
    } catch (error) {
        console.log(error);
    }
}

exports.createUser = createUser
exports.getUserById = getUserById
exports.getUsers = getUsers