const db_util = require('../utils/db'),

getLocalList = async() =>{
    funds = await db_util.getLocalList()
    return funds
},

getFundHeader = async(ticker) =>{
    let fund = await db_util.getFundHeader(ticker)
    return fund
}

module.exports = {
    getLocalList,
    getFundHeader
}

