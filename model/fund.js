const 
db_util = require('../utils/db'),

// Get founds
get = async(ticker) => {
    return (ticker) ? (await db_util.dbGet('fondo','ticker',ticker)) : (await db_util.dbGet('fondo'))
}

module.exports = {
    get
}

