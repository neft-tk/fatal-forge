import {useEffect, useState} from "react";
import React from "react";
import Login from "./components/login/Login";
import Nav from "./components/Nav";
import Lobby from './components/lobby/Lobby'
import Gameview from './components/gameview/Gameview'
import Settings from './components/lobby/Lobby'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import Assembly from './components/gameview/assembly/Assembly'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(()=>{
  //   //let loggedin = checkIfLoggedIn();
  //   /*
  //     if (isLoggedIn != loggedin){
  //       setIsLoggedIn(loggedin);
  //     }

  //   */


  //     // basically just hit local storage and validate if we are logged in and set the
  //     // state if its different than the current state
  //   })
  

  // const renderRoutes = () => {
  //   return (
  //    <>
     
  //     <Nav/>

  //     <div id="routeContainer">
  //       <Router>
  //         <Routes>
  //           <Route path='/' element={<Lobby/>}/>
  //           <Route path='/lobby' element={<Lobby/>}/>
  //           <Route path='/gameview' element={<Gameview/>}/>
  //           <Route path='/settings' element={<Settings/>}/>
  //         </Routes>
  //       </Router>
  //     </div>

  //    </>
  //   )

  // }

  // return (
  //   <div className="App">
      
  //     {isLoggedIn ? renderRoutes() : <Login setLogin={setIsLoggedIn} />}
      
  //   </div>
  // );
  return (
<Assembly />
  )
}

export default App;
