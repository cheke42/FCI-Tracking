

const 
_fetch = async(url,method = 'get',body) => {
    let 
    _body = body ? JSON.stringify(body) : null,
    _header = { 'Accept': 'application/json','Content-Type': 'application/json'},
    _response = await fetch(url,{headers: _header, method: method,body: _body}),
    _jsonResponse = await _response.json()
    return _jsonResponse
}

module.exports = {
    _fetch
}