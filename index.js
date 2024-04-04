const 
app = require('./app'),
port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`Server Running:  http://localhost:${port}`)
})