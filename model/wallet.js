const 
db_util = require('../utils/db'),

// Get wallet
get = async(id_wallet) => {
    return (id_wallet) ? (await db_util.dbGet('billetera','id',id_wallet)) : (await db_util.dbGet('billetera'))
},

// Get Details
getDetails = async(id_wallet) => {
    let myQuery = `select * from billetera_fondo where id_billetera = '${id_wallet}'`
    return await db_util.dbRun(myQuery)
}

module.exports = {
    get,
    getDetails
}
