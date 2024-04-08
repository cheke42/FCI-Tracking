const 
express = require('express'),
bodyParser = require('body-parser'),
app = express(),
path = require('path')

// Carga de archivo de rutas
fund_routes = require('./routes/fund'),
wallet_routes = require('./routes/wallet'),
user_routes = require('./routes/user')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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


app.use(express.static(path.join(__dirname,'client')))


module.exports = app;