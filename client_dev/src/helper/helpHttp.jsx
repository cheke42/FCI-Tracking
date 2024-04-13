export const helpHttp = () => {

    const asyncFetch = async(url) => {
        let 
        res = await fetch(url),
        json_res = await res.json()
        return json_res
    }

    const get = (url, options = {} ) => asyncFetch(url)
    const post = (url, options = {} ) => asyncFetch(url)
    

    return {
        get,
        post
    }

}