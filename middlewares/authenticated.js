'use strict'
// Cargamos JWT(encriptación)
var jwt = require('jwt-simple');
// Cargamos Moment (Fecha y hora)
var moment = require('moment');
// Definimos una clave secreta para utilizar en la encrptación
var secret = 'clave_prueba';

// Exportamos la funcionalidad para asegurar la Autenticación
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
	}
	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'Token has expired'});
		}
	}catch(ex){
		//console.log(ex);
		return res.status(404).send({message: 'Invalid Token'});
	}
	req.user = payload.username.data[0]
	next();
};