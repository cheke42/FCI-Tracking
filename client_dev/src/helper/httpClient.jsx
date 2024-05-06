
const api = process.env.REACT_APP_EXPRESS_API;
const 
_fetch = async(endpoint,method = 'get',body) => {
    //console.log(`Petición realizada: ${api+endpoint}`)
    let 
    _body = body ? JSON.stringify(body) : null,
    _header = { 'Accept': 'application/json','Content-Type': 'application/json'},
    _response = await fetch(api+endpoint,{headers: _header, method: method,body: _body}),
    _jsonResponse = await _response.json()
    return _jsonResponse
}

module.exports = {
    _fetch
}