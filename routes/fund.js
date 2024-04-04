// Cargamos Express
var express = require('express');

// Cargamos el controlador para Canción
var FundController = require('../controllers/fund');

var api = express.Router();

api.get('/fund', FundController.getFund);

module.exports = api;