'use strict'

// Cargamos JWT (encriptación)
var jwt = require('jwt-simple');
// Cargamos Moment (gestionar fecha y hora)
var moment = require('moment');
// Creamos una clave secreta: Dicha clave es utilizada a la hora de generar los tokens
var secret = 'clave_prueba';

// Exportamos la funcionalidad de creación de tokens.
exports.createToken = function(username){
	var payload = {
		username: username,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
};