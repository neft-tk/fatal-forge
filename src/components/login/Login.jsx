// The Login component provides a form and handler for users logging in.

import {useEffect, useState} from "react";
// import API from "./utils/API.js";


/*

this was all copy pasted stuff that erik pulled from joes example

i passed the setlogin state function through the props from the app component..
that's the only change i made.

*/


export default function Login(props) {
  const [userId, setUserId] = useState(0)
  const [token, setToken] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // useEffect(()=>{
  //   const storedToken = localStorage.getItem("token")
  //   if(storedToken){
  //     console.log(storedToken)
  //     API.getUserFromToken(storedToken).then(data=>{
  //       if(data.user){
  //         console.log(data)
  //         setToken(storedToken)
  //         props.setIsLoggedIn(true)
  //         setUserId(data.user.id)
  //       }
  //     })
  //   } else {
  //     console.log('no stored token')
  //   }
  // },[])

  const handleLoginSubmit = e=>{
    e.preventDefault();
    // API.login({
    //   email:loginEmail,
    //   password:loginPassword
    // }).then(data=>{
    //   console.log(data);
    //   if(data.token){
    //     setUserId(data.user.id)
    //     setToken(data.token)
        props.setIsLoggedIn(true)
    //     localStorage.setItem("token",data.token)
    //   }
    // })
  }
  const handleLogout = ()=>{
    // localStorage.removeItem("token");
    props.setIsLoggedIn(false);
    // setUserId(0);
    // setToken("");
  }
    return (
      <form onSubmit={handleLoginSubmit}>
      <h3>Login</h3>
      <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
      <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
      <button>Log in!</button>
    </form>
  )
}