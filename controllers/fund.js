const
fundModel = require("../model/fund"),

getFund = async (req,res) =>{
	let
	fund = await fundModel.getLocalList()
	res.status(200).send(fund);
}

module.exports = {
	getFund
}