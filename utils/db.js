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
},

getDBFundHeader = async(ticker) => {
    let myQuery = `SELECT * FROM fondo WHERE ticker = '${ticker}'`
    let fundHeader = await queryGetDB(myQuery)
    return fundHeader ? fundHeader[0] : null
},

getFundHeader = async(ticker) =>{
    let fondo = await getDBFundHeader(ticker)
    if (!fondo){
        fondo = await scraper.obtenerCabecera(ticker)
        fondo.perfil = await getFoundID('perfil','nombre',fondo.perfil)
        fondo.foco = await getFoundID('foco','nombre',fondo.foco)
        fondo.familia = await getFoundID('familia','nombre',fondo.familia)
        fondo.estrategia = await getFoundID('estrategia','nombre',fondo.estrategia)
        fondo.horizonte = await getFoundID('horizonte','nombre',fondo.horizonte)
        await guardarCabeceraFondo(fondo)
        fondo = await getDBFundHeader(ticker)
    }    
    return fondo
}

module.exports = {
    getLocalList,
    getFundHeader
}