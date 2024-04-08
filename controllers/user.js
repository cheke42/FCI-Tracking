const
userModel = require("../model/user"),
{ createHash} = require('crypto'),

login = async (req,res) => {
	let 
    params = req.body
	username = params.username,
	password = params.password,
    response = await userModel.login(username,password)
	res.status(200).send(response)
}


module.exports = {
	login
}