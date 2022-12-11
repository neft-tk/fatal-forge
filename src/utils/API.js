// in dev mode
const URL_PREFIX= "http://localhost:3001"
// in prod mode
// const URL_PREFIX= "https://todo-joewt.herokuapp.com"

const API = {
    login: async (userObj)=>{
        const res = await fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json()
    },
    signUp: async (userObj) => {
        const res = await fetch(`${URL_PREFIX}/api/users/`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getUserFromToken: async (token)=>{
        const res = await fetch(`${URL_PREFIX}/api/users/readtoken`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return await res.json()
    },
}
export default API