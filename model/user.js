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

// Encriptar password
encrypPassword = (password) =>{
    return createHash('sha256').update(password).digest('base64')
}


module.exports = {
    login
}
