const
userModel = require("../model/user"),

login = async (req,res) => {
	let 
    params = req.body
	username = params.username,
	password = params.password,
    response = await userModel.login(username,password)
	res.status(200).send(response)
},

createAccount = async (req,res) => {
	let
	params = req.body,
	username = params.username,
	password = params.password
	response = await userModel.createAccount(username,password)
	res.status(200).send(response)
}


module.exports = {
	login,
	createAccount
}