'use strict'
const app = require('./app');

var port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`Servidor del api rest de musica escuchando en http://localhost:${port}`)
})