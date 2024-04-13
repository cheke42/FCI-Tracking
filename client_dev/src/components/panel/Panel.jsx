
export function Panel(){

    const handlerFetchear = async() => {
        console.log(walletURL)
        let resp = await fetch(walletURL,{credentials: 'include'})
        const ddd = await resp.json()
        console.log(ddd)
    },

    walletURL = `http://localhost:10000/api/wallet/`

    return (
        <div>
            <h1>I'm a panel</h1>
            <button onClick={handlerFetchear}>Fetchear</button>
        </div>
    )

}