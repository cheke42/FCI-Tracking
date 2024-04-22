const 
db_util = require('../utils/db'),

// Get wallet
get = async(id_wallet) => {
    return (id_wallet) ? (await db_util.dbGet('billetera','id',id_wallet)) : (await db_util.dbGet('billetera'))
},

// Get Details
getDetails = async(id_wallet) => {
    let myQuery = `select b.id, b.nombre, bf.cantidad,f.ticker, f.title,ua.precio, ua.fecha as "ultima_actualizacion"
    from billetera_fondo as bf inner join fondo as f on bf.ticker = f.ticker inner join billetera as b on bf.id_billetera = b.id inner join ultima_analitica as ua on f.ticker = ua.ticker
    where b.id = ${id_wallet}`
    return await db_util.dbRun(myQuery)
},

// 
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
},

getWalletDatailByDate = async(id,fecha)=> {
    let myQuery = `select * from(
        select fecha,ticker,precio from (select a.* from ultima_analitica as ua inner join analitica as a where ua.ticker = a.ticker and a.fecha < ${fecha} order by ticker,a.fecha desc) as af group by af.ticker) as au inner join billetera_fondo as bf on au.ticker = bf.ticker
        where id_billetera = ${id}`
    return await db_util.dbRun(myQuery)
}


module.exports = {
    get,
    getDetails,
    getDailyPerfomance,
    getWalletDatailByDate
}
