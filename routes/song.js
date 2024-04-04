// Cargamos Express
var express = require('express');

// Cargamos el controlador para Canción
var SongController = require('../controllers/song');

var api = express.Router();

api.get('/song', SongController.getSong);

module.exports = api;