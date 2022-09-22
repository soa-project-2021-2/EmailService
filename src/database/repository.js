const database = require('./db');
const User = require('./users');
const Product = require('./products');

async function createUser(name, email, send_email) {
    try {
        await database.sync();
        const resultadoCreate = await User.create({
            name: name,
            email: email,
            send_email: send_email
        })
        console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }
}

async function createProduct(name, price) {
    try {
        await database.sync();
        const resultadoCreate = await Product.create({
            name: name,
            price: price
        })
        console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }
}


exports.createProduct = createProduct
exports.createUser = createUser