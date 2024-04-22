const
fundModel = require("../model/fund"),

get = async (req,res) => {
	let 
	ticker = req.params.ticker,
	fund = await fundModel.get(ticker)
	res.status(200).send(fund)
},
getRemoteList = async (req,res) =>{
    funds = await fundModel.getRemoteList()
    res.status(200).send(funds)
},
getAnalytics = async (req,res) =>{
    let ticker = req.params.ticker
    let year = req.params.year
    let month = req.params.month
    let day = req.params.day
    let analytics = await fundModel.getRemoteAnalyticals(ticker,year,month,day)
    res.status(200).send(analytics)
}

module.exports = {
	get,
	getRemoteList,
	getAnalytics
}