// in dev mode
const URL_PREFIX= "http://localhost:3001"
// in prod mode
// const URL_PREFIX= "https://todo-joewt.herokuapp.com"

const API = {
    login: (userObj)=>{
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    getUserFromToken:(token)=>{
        return fetch(`${URL_PREFIX}/api/users/readtoken`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res=>res.json())
    },
}
export default API