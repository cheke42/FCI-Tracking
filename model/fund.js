db_util = require('../utils/db')

getLocalList = async() =>{
    funds = await db_util.getLocalList()
    return funds
}

module.exports = {
    getLocalList,
}

