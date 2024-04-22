const 
db_util = require('../utils/db'),
axios = require('axios'),
PROVIDER = 'https://www.bullmarketbrokers.com'
// Get funds from DB
get = async(ticker) => {
    return (ticker) ? (await db_util.dbGet('fondo','ticker',ticker)) : (await db_util.dbGet('fondo'))
},
// Get funds data from external resource
getRemoteList = async() =>{
    let remoteURL = `${PROVIDER}/Operations/funds/GetFundsProducts?pageSize=5000&isActive=false`,
    localFunds = (await get()).data
    localFunds = localFunds.map( lf => lf.ticker)
    let funds = await axios.get(remoteURL).then(res => res.data.records)
    funds = funds.map(fund => ({ticker: fund.fundBloombergId,nombre: fund.fundName}))
    funds = funds.filter((fund) => {return fund.nombre.includes("CLASE A") && !localFunds.includes(fund.ticker)})
    return funds
}

// Get analyticals from external resource
getRemoteAnalyticals = async(ticker,year,month,day) =>{
    let 
    analyticals = (await axios.get(`${PROVIDER}/Information/FundData/GetPriceData?ticker=${ticker}`)).data.fundValues
    analyticals = _filterAnalyticalResults(analyticals,year,month,day)
    analyticals = await _filterNew(ticker,analyticals)
    if(analyticals.length > 0){
        let insertQuery = `INSERT INTO analitica ('fecha','precio','ticker') VALUES`
        analyticals.forEach(a => { insertQuery += `( '${a.fecha}' , '${a.precio}', '${ticker}'),`})
        insertQuery = insertQuery.slice(0,-1)
        await db_util.dbRun(insertQuery)
        return {status: "success", message: `Se agregaron ${analyticals.length} de ${ticker}`}
    }
    return {status: "success", message: `Ya se encuentran los datos actualizados`}
},

// Filter analyticals by year,month and day
_filterAnalyticalResults = (analyticals, year = null, month = null, day = null) =>{
    const results = analyticals.filter((elem,index) =>{
        let 
        [fund_year,fund_month,fund_day] = [elem.date.substring(0,4),elem.date.substring(5,7),elem.date.substring(8,10)],
        condition = false,
        repeatsCondition = (index === analyticals.findIndex( o => elem.date === o.date))
        if (year){
            if(month){
                if(day){ condition = fund_year == year && fund_month == month && fund_day == day && repeatsCondition}
                else{ condition = fund_year == year && fund_month == month && repeatsCondition}
            }else{ condition = fund_year == year && repeatsCondition}
        }
        else{ condition = repeatsCondition}
        return condition
    })
    return results
},

// It Compare and filter new analytical data
_filterNew = async(ticker,analyticals) => {
    analyticals = analyticals.map((f) => ({fecha: `${f.date.substring(0,4)}${f.date.substring(5,7)}${f.date.substring(8,10)}`,precio: f.close})) 
    localAnalyticals = (await db_util.dbRun(`SELECT fecha FROM analitica where ticker = '${ticker}'`)).data
    localAnalyticals = localAnalyticals.length !== 0 ? (localAnalyticals.map(a => `${a.fecha}`)) : [] 
    analyticals = analyticals.filter(a => !localAnalyticals.includes(a.fecha))
    return analyticals
},

module.exports = {
    get,
    getRemoteList,
    getRemoteAnalyticals
}

