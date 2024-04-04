sqlite3 = require('sqlite3') // Librería sqlite3
db = new sqlite3.Database('data/database.db') // SQLITE BD


db.on("error", function(error) {
    console.log("Getting an error : ", error);
}); 

const queryGetDB = (query) =>{
    return new Promise((resolve,reject) =>{
        db.all(query, (err,rows) => {
            try {
                if (err) {reject(err)}
                if (rows){resolve(rows)}
                else{resolve(null)}
            } catch (error) {
                resolve(null)
            }
        })
    })
}

const getLocalList = async() =>{
    let 
    myQuery = 'select id,title,ticker from fondo',
    funds = await queryGetDB(myQuery)
    return funds
}

module.exports = {
    getLocalList
}