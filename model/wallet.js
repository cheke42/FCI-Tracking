const 
db_util = require('../utils/db'),

// Get wallet
get = async(id_wallet) => {
    return (id_wallet) ? (await db_util.dbGet('billetera','id',id_wallet)) : (await db_util.dbGet('billetera'))
},

// Get Details
getDetails = async(id_wallet) => {
    let myQuery = `SELECT * FROM billetera_fondo WHERE id_billetera = '${id_wallet}'`
    return await db_util.dbRun(myQuery)
},

getDailyPerfomance = async(id_wallet,fecha) => {
    let myQuery = `SELECT * FROM( 
        SELECT fecha,ticker,precio FROM (SELECT a.* FROM ultima_analitica as ua inner join analitica as a WHERE ua.ticker = a.ticker and a.fecha < ${fecha} order by ticker,a.fecha desc) as af group by af.ticker) as au inner join billetera_fondo as bf on au.ticker = bf.ticker
        WHERE id_billetera = ${id_wallet}`,
    result = await db_util.dbRun(myQuery),
    res_data = {data:{}}
    res_data.status = "success"
    res_data.data.funds = result.data
    res_data.data.cant = result.data.length
    res_data.data.total = result.data.reduce((partial,fund) => partial + (fund.cantidad * fund.precio),0).toFixed(2)
    return res_data
}

module.exports = {
    get,
    getDetails,
    getDailyPerfomance
}
