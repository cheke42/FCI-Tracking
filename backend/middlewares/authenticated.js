'use strict'
// Cargamos JWT(encriptación)
var jwt = require('jwt-simple');
// Cargamos Moment (Fecha y hora)
var moment = require('moment');
// Definimos una clave secreta para utilizar en la encrptación
var secret = 'clave_prueba';

// Exportamos la funcionalidad para asegurar la Autenticación
exports.ensureAuth = function(req, res, next){
	if(process.env.DEV_STATUS != 'develompent'){
		let 
		token = req.cookies.token
		console.log(process.env.DEV_STATUS)
		try{
			let payload = jwt.decode(token, secret);
			console.log(payload)
			if(payload.exp <= moment().unix()){
				return res.status(401).send({message: 'Token has expired'});
			}
		}catch(ex){
			return res.status(404).send({message: 'Invalid Token'});
		}
	}
	next();
};