const 
express = require('express'),
bodyParser = require('body-parser'),
app = express(),
path = require('path'),
cookieParser = require("cookie-parser"),

// Carga de archivo de rutas
fund_routes = require('./backend/routes/fund'),
wallet_routes = require('./backend/routes/wallet'),
user_routes = require('./backend/routes/user')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
// Configuración de cabeceras HTTP (Para evitar problemas de CORS)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api/fund',fund_routes)
app.use('/api/wallet',wallet_routes)
app.use('/api/user',user_routes)
app.get('/prueba',(req,res) => res.status(200).send("<h1>✅✅✅ Everything OK! ✅✅✅</h1>"))

// Static route to show the "react" build in "client" folder
app.use('/',express.static('client',{redirect: false}))
// React router
app.get('*',(req,res,next) => res.sendFile('client/index.html',{root: __dirname}))




module.exports = app;