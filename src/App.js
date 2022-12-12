import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import API from './utils/API';
import Nav from './components/Nav';
import Login from './components/pages/login/Login';
import Lobby from './components/pages/lobby/Lobby';
import Gameview from './components/gameview/Gameview';
import Assembly from './components/gameview/Assembly';
import Settings from './components/pages/settings/Settings';
import Deckbuilder from './components/pages/deckbuilder/Deckbuilder';
import Profile from './components/pages/profile/Profile';
import Friends from './components/pages/friends/Friends';
import './style.css';
import Socket from './utils/socket';

function App() {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const [view, setView] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // console.log(storedToken);
        API.getUserFromToken(storedToken).then((data) => {
          if (data.user) {
            setToken(storedToken);
            setIsLoggedIn(true);
            setUserId(data.user.id);
            setUserName(data.user.username);
            setUserEmail(data.user.email);
            Socket.Auth.RegisterSocket(data.user);
          }
        });
      } else {
        console.log('no stored token');
      }
    }
  });

  const handleLogin = (userObj) => {
    // console.log("APP Client side:");
    // console.log(userObj);
    API.login(userObj).then((data) => {
      // console.log("data:",data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserName(data.user.username);
        setUserEmail(data.user.email);
        localStorage.setItem('token', data.token);
        Socket.Auth.RegisterSocket(data.user);
      }
    });
  };

  const handleSignup = (userObj) => {
    API.signup(userObj).then((data) => {
      // console.log('data', data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        setUserName(data.user.username);
        setUserEmail(data.user.email);
        localStorage.setItem('token', data.token);
        Socket.Auth.RegisterSocket(data.user);
      }
    });
  };

  const renderRoutes = () => {
    return (
      <>
        <Router>
          <div className="flex w-screen h-screen">
            <Nav view={view} setView={setView} />
            <div id="routeContainer" className="w-full h-full bg-main-bg">
              <Routes>
                {/* LOBBY: */}
                <Route path="/" element={<Lobby />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/gameview" element={<Gameview />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/deckbuilder" element={<Deckbuilder />} />
                <Route path="/profile" element={<Profile userId={userId}/>} />
                <Route path="/friends" element={<Friends />} />
              </Routes>
            </div>
          </div>
        </Router>
      </>
    );
  };

  return (
    <div className="w-screen h-screen">
      {isLoggedIn ? (
        renderRoutes()
      ) : (
        <Login setLogin={setIsLoggedIn} handleLogin={handleLogin} handleSignup={handleSignup} />
      )}
    </div>
  );
}

export default App;
