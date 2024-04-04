sqlite3 = require('sqlite3') // Librería sqlite3
db = new sqlite3.Database('data/database.db') // SQLITE BD


db.on("error", function(error) {
    console.log("Getting an error : ", error);
}); 

/**
 * DB GET: Params (TABLE, PROPERTY, VALUE)
 */
const dbGet = async(table,property,value) => {
    let myQuery = `SELECT * FROM ${table}`
    myQuery += value ?  ` WHERE ${property} = '${value}'` : ''
    return await dbRun(myQuery)
},

/**
 * DB Insert: Params (TABLE, COLUMNS, VALUES)
 */
dbInsert = async(table,columns,values) =>  {
    let 
    tmp_values = values.split(',').map((value) => `"${value}"`).toString(),
    tmp_columns = columns.split(',').map((col) => `"${col}"`).toString(),
    myQuery = `INSERT INTO ${table} (${tmp_columns}) VALUES (${tmp_values})`
    return await dbRun(myQuery)
},

/**
 * DB Delete: Params (TABLE, COLUMN, VALUE)
 */
dbDelete = async(table,property, value) => {
    let
    myQuery = `DELETE FROM ${table} WHERE ${property} = '${value}'`
    return await dbRun(myQuery)
},

// dbRun: Run Query
dbRun = async(query) => {
    const resultQuery = await new Promise(resolve => {
        db.all(query, (err,rows) => {
          if (err) {
            resolve({status: "error", message: err.message});
          }
          resolve({status: "success", data: rows});
        });
      });
    return resultQuery
}

module.exports = {
    dbGet,
    dbInsert,
    dbDelete,
    dbRun
}