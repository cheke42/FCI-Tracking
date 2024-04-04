var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Carga de archivo de rutas
var song_routes = require('./routes/song');
var fund_routes = require('./routes/fund')
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

app.use('/api', song_routes);
app.use('/api',fund_routes)

module.exports = app;