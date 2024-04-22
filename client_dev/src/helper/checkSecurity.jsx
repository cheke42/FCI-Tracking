
const 
_checkSecurity = async(navigate,loggedIn) => {
    if(!loggedIn){
        navigate(`/login`, { replace: true });
    }
}

module.exports = {
    _checkSecurity
}