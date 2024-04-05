const
walletModel = require("../model/wallet"),

get = async (req,res) => {
	let 
	id_wallet = req.params.id_wallet,
	wallet = await walletModel.get(id_wallet)
	res.status(200).send(wallet)
},

getDetails = async(req,res) => {
    id_wallet = req.params.id_wallet,
    wallet = await walletModel.getDetails(id_wallet)
	res.status(200).send(wallet)
},

getDailyPerfomance = async (req,res) => {
	let
	id_wallet = req.params.id_wallet,
	fecha = req.params.fecha
    wallet = await walletModel.getDailyPerfomance(id_wallet,fecha)
	res.status(200).send(wallet)
}

module.exports = {
	get,
    getDetails,
	getDailyPerfomance
}