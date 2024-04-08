const 
db_util = require('../utils/db'),
{ createHash} = require('crypto'),
jwt = require('../services/jwt')

// Login: Devuelve el token en caso de que las credenciales sean correctas
login = async(username,pwd) => {
    let 
    enc_pwd = encrypPassword(pwd)
    myQuery = `SELECT * FROM usuario where username = '${username}' and password = '${enc_pwd}'`,
    user = await db_util.dbRun(myQuery)
    resp = {}
    resp.status = user.data.length === 0 ? user.status = 'error' : user.status = 'success'
    if (resp.status == 'success'){
        resp.token = jwt.createToken(user,enc_pwd)
    }
    return resp
},    

createAccount = async  (username,pwd) => {
    let 
    enc_pwd = encrypPassword(pwd),
    myQuery = `SELECT * FROM usuario where username = '${username}'`,
    user = await db_util.dbRun(myQuery)
    if (user.data.length === 0){
        newAccount = await db_util.dbInsert('usuario','username,password',`${username},${enc_pwd}`)
        return newAccount
    }
    return {status: 'error',message: 'The username is not available'}
},

// Encriptar password
encrypPassword = (password) =>{
    return createHash('sha256').update(password).digest('base64')
},



module.exports = {
    login,
    createAccount
}
