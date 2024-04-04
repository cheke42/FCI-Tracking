// Cargamos Express
var express = require('express');

// Cargamos el controlador para Canción
var FundController = require('../controllers/fund');

var api = express.Router();

api.get('/header/:ticker',FundController.getHeader)
api.get('/localList', FundController.localList);


module.exports = api;