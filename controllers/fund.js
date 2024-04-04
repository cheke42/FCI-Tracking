const
fundModel = require("../model/fund"),

get = async (req,res) => {
	let 
	ticker = req.params.ticker,
	fund = await fundModel.get(ticker)
	res.status(200).send(fund)
}

module.exports = {
	get
}