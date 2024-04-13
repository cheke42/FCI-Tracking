const 
app = require('./app'),
port = process.env.PORT || 10000;
env = require('dotenv').config({path: './.env'})



app.listen(port,() =>{
    console.log(`Server Running:  http://localhost:${port}`)
})