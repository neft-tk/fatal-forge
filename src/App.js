import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import API from './utils/API';
import Nav from './components/Nav';
import Login from './components/login/Login';
import Lobby from './components/lobby/Lobby';
import Gameview from './components/gameview/Gameview';
import Assembly from './components/gameview/assembly/Assembly';
import Settings from './components/settings/Settings';
import Deckbuilder from './components/deckbuilder/Deckbuilder';
import './style.css';
import Socket from './utils/socket'

function App() {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const [view, setView] = useState('');

  useEffect(()=>{
    if (!isLoggedIn){
      const storedToken = localStorage.getItem("token");
      if(storedToken){
        console.log(storedToken);
        API.getUserFromToken(storedToken).then(data=>{
          console.log('effect', data);
          if(data.user){
            console.log(data);
            setToken(storedToken);
            setIsLoggedIn(true);
            setUserId(data.user.id);
            setUserName(data.user.username);
            setUserEmail(data.user.email);
            Socket.Auth.RegisterSocket(data.user)
          }
        })
      } else {
        console.log('no stored token');
      };
    }
  })

  const handleLogin = userObj => {
    // console.log("APP Client side:");
    // console.log(userObj);
    API.login(userObj).then(data=>{
      console.log("data:",data);
      if(data.token){
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserName(data.user.username);
        setUserEmail(data.user.email);
        localStorage.setItem("token", data.token);
        Socket.Auth.RegisterSocket(data.user)
      };
    });
  };

  // TODO: handle sign up
  const handleSignUp = userObj => {
    API.signUp(userObj).then(data => {
      console.log("data", data);
      if(data.token){
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserName(data.user.username);
        setUserEmail(data.user.email);
        localStorage.setItem("token", data.token);
        Socket.Auth.RegisterSocket(data.user)
      };
    });
  };

  const renderRoutes = () => {
    return (
      <>
        <Router>
          <Nav view={view} setView={setView} />
          <div id="routeContainer">
            <Routes>
              <Route path="/" element={<Lobby />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/gameview" element={<Gameview />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/deckbuilder" element={<Deckbuilder />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  };

  return (
    <div className="App">
      {isLoggedIn ? renderRoutes() : <Login setLogin={setIsLoggedIn} handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
