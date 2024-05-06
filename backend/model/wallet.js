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
    where b.id = ${id_wallet} order by f.ticker`
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
},

getRangeDate = async(id,limit)=> {
    let
    dates = await _getLastAnalyticals(limit)
    historial = []
    for (d of dates){
        tmpDetail = await getWalletDatailByDate(id,d)
        historial.push(tmpDetail.data)
    }
    return historial
},

_getLastAnalyticals = async(limit) => {
    let 
    myQuery = `select analitica.fecha from analitica GROUP by fecha order by fecha desc limit ${limit}`,
    last = (await db_util.dbRun(myQuery)).data
    last = last ? last.map((l) => l.fecha) : []
    return last
},

saveWallet = async(wallet_name) => {
    wallet = (await db_util.dbGet('billetera','nombre',wallet_name)).data
    if(!wallet.length){
        await db_util.dbInsert('billetera','nombre',wallet_name)
        return {statuts: 'success'}
    }
    return {status: 'error',msg: 'La billetera ya existe'}
},

getWalletBalance = async(id_wallet,fecha) => {
    let myQuery = `select sum(cantidad*precio) as "saldo",bf.id_billetera as "billetera",a.fecha
    from billetera_fondo as bf join analitica as a on bf.ticker = a.ticker
    where a.fecha = '${fecha}' and bf.id_billetera = '${id_wallet}'`
    return await db_util.dbRun(myQuery)
},

getPreviousWalletBalance = async(id,fecha) => {
    let myQuery = `SELECT sum(cantidad*precio) as "saldo",bf.id_billetera as "billetera",a.fecha from (select fecha,bf.id_billetera
        from billetera_fondo as bf join analitica as a on bf.ticker = a.ticker where a.fecha < '${fecha}' and bf.id_billetera = '${id}'
        group by fecha order by fecha desc limit 1) as 'lp' join  billetera_fondo as bf on lp.id_billetera = bf.id_billetera 
        join analitica as a on bf.ticker = a.ticker
        where a.fecha = lp.fecha`
    return await db_util.dbRun(myQuery)
},

getTicker = async(id) => {
    let myQuery = `select ticker from billetera_fondo where id_billetera = ${id}`
    return await db_util.dbRun(myQuery)
},

getLastPerfomance = async(id) => {
    let myQuery = `select id_billetera,a.fecha as "ultima_analitica" from billetera_fondo as bf join analitica as a on bf.ticker = a.ticker
    where bf.id_billetera = '${id}' order by fecha desc limit 1`
    perfomance = await db_util.dbRun(myQuery)
    perfomance.data = perfomance.data[0]
    return perfomance
}


module.exports = {
    get,
    getDetails,
    getDailyPerfomance,
    getWalletDatailByDate,
    getRangeDate,
    getWalletBalance,
    getPreviousWalletBalance,
    getTicker,
    getLastPerfomance,
    saveWallet,
}
