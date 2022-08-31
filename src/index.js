const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//db
(async () => {
    const database = require('./db');
    const User = require('./users');
 
    try {
        const resultado = await database.sync();
        console.log(resultado);

        // const resultadoCreate = await User.create({
        //     nome: 'Lucas Meliante',
        //     email: 'meliante@gmail.com'
        // })
        // console.log(resultadoCreate);
    } catch (error) {
        console.log(error);
    }
})();