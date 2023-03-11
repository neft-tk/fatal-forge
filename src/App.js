import React, { useEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import API from './utils/API';
import Nav from './components/Nav';
import Login from './components/pages/login/Login';
import Lobby from './components/pages/lobby/Lobby';
import Gameview from './components/gameview/Gameview';
import Settings from './components/pages/settings/Settings';
import Deckbuilder from './components/pages/deckbuilder/Deckbuilder';
import Profile from './components/pages/profile/Profile';
import Friends from './components/pages/friends/Friends';
import './style.css';
import Socket from './utils/socket';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import options from './assets/particles/ember.json';

function App() {

  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidSignup, setIsValidSignup] = useState(true);
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
        // TODO: Handle exception.
      }
    }
  });

  const handleLogin = (userObj) => {
    API.login(userObj).then((data) => {

      if (data.msg === 'invalid login credentials') {
        setIsValidLogin(false);
      }

      if (data.token) {
        setIsValidLogin(true);
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

      if (data.msg === 'An error occurred creating a new user.') {
        setIsValidSignup(false);
      }

      if (data.token) {
        setIsValidSignup(true);
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

  const handleDeckCreate = (deckObj) => {
    API.createDeck(deckObj).then((data) => {
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(0);
    setToken('');
    setUserName('');
    setUserEmail('');
    // TODO: Socket.Auth stuff?
    
  };

  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const renderRoutes = () => {
    return (
      <>
        <Router>
          <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
            <Nav view={view} setView={setView} handleLogout={handleLogout} />
            <div id="routeContainer" className="w-full h-full overflow-x-hidden gl-scrollbar">
              <Particles
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
              />
              <Routes>
                {/* LOBBY: */}
                <Route path="/" element={<Lobby />} />
                <Route path="/lobby" element={<Lobby userId={userId} />} />
                <Route path="/gameview" element={<Gameview />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/deckbuilder"
                  element={
                    <Deckbuilder
                      userId={userId}
                      handleDeckCreate={handleDeckCreate}
                      token={token}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      userId={userId}
                      token={token}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  }
                />
                <Route
                  path="/friends"
                  element={<Friends userId={userId} token={token} />}
                />
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
        <>
          <Particles
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
          />
          <Login
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            isValidLogin={isValidLogin}
            isValidSignup={isValidSignup}
          />
        </>
      )}
    </div>
  );
}

export default App;
