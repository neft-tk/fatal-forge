import {useEffect, useState} from "react";
import React from "react";
import Login from "./components/login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  }
  return (
    <div className="App">
      {isLoggedIn&&<button onClick={handleLogout}>Logout</button>}
      {isLoggedIn?(
        <div>
          <Login/>
        </div>
      ):(
        <form onSubmit={handleLoginSubmit}>
          <h3>Login</h3>
          <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
          <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
          <button>Log in!</button>
        </form>
      )}
      
    </div>
  );


export default App;
