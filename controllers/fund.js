const
fundModel = require("../model/fund"),

localList = async (req,res) =>{
	let
	fund = await fundModel.getLocalList()
	res.status(200).send(fund);
},

getHeader = async (req,res) => {
	let 
	ticker = req.params.ticker,
	fund = await fundModel.getFundHeader(ticker)
	res.status(200).send(fund)
}

module.exports = {
	localList,
	getHeader
}