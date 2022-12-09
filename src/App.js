import { useEffect, useState } from "react";
import React from "react";
import Login from "./components/login/Login";
import Nav from "./components/Nav";
import Lobby from './components/lobby/Lobby'
import Gameview from './components/gameview/Gameview'
import Settings from './components/lobby/Lobby'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Assembly from './components/gameview/assembly/Assembly'
import Deckbuilder from "./components/deckbuilder/Deckbuilder";
import './styles.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [view, setView] = useState("");

  useEffect(() => {
    //let loggedin = checkIfLoggedIn();
    /*
      if (isLoggedIn != loggedin){
        setIsLoggedIn(loggedin);
      }

    */
    // basically just hit local storage and validate if we are logged in and set the
    // state if its different than the current state
  })

  const renderRoutes = () => {

    return (
      <>
        <Router>
          <Nav view={view} setView={setView} />
          <div id="routeContainer">
            <Routes>
              <Route path='/' element={<Lobby />} />
              <Route path='/lobby' element={<Lobby />} />
              <Route path='/gameview' element={<Gameview />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/deckbuilder' element={<Deckbuilder />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }

  return (
    <div className="App">

      {isLoggedIn ? renderRoutes() : <Login setLogin={setIsLoggedIn} />}

    </div>
  );
}

export default App;
