// React ===============
import React, { useEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
// Components ===============
import Nav from './components/Nav';
import Login from './components/pages/login/Login';
import Lobby from './components/pages/lobby/Lobby';
import Gameview from './components/gameview/Gameview';
import Deckbuilder from './components/pages/deckbuilder/Deckbuilder';
import Profile from './components/pages/profile/Profile';
import Friends from './components/pages/friends/Friends';
// Particles ===============
import Particles from 'react-tsparticles';
// Engine loading function
import { loadFull } from 'tsparticles';
// Particles Option object
import options from './assets/particles/ember.json';
// Styling ===============
import './style.css';
// Utils ===============
import API from './utils/API';
import Socket from './utils/socket';

function App() {
  // State for login and signup validation.
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidSignup, setIsValidSignup] = useState(true);
  // userId is used to identify the user in the database.
  const [userId, setUserId] = useState(0);
  // Is the user logged in?
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // JWT token is used to authenticate the user on the backend.
  const [token, setToken] = useState('');
  // view is used to determine which page to render in the main content area.
  const [view, setView] = useState('');

  // Check if the user has a token on rerender, automatically signing them in if so.
  useEffect(() => {
    // If the user is not logged in yet, check if there is a token in local storage.
    if (!isLoggedIn) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Get the user from the token, sign them in.
        API.getUserFromToken(storedToken).then((data) => {
          if (data.user) {
            setToken(storedToken);
            setIsLoggedIn(true);
            setIsValidLogin(true);
            setUserId(data.user.id);
            Socket.Auth.RegisterSocket(data.user);
          }
        });
      } else {
        // TODO: Handle exception.
      }
    }
  });

  // Takes login fields and hits the login endpoint to create and set the state accordingly.
  const handleLogin = (userObj) => {
    // Check if the user is valid.
    API.login(userObj).then((data) => {
      // If not, set the state to reflect that.
      if (data.msg === 'invalid login credentials') {
        setIsValidLogin(false);
      }
      // Otherwise, set the state to reflect that the user is logged in.
      if (data.token) {
        setIsValidLogin(true);
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
        Socket.Auth.RegisterSocket(data.user);
      }
    });
  };

  // Hit the signup endpoint to create and set the state accordingly.
  const handleSignup = (userObj) => {
    API.signup(userObj).then((data) => {
      // If we return an error, signup was not valid.
      if (data.msg === 'An error occurred creating a new user.') {
        setIsValidSignup(false);
      }
      // If we return a token, log in the user and reflect that in state and local storage.
      if (data.token) {
        setIsValidSignup(true);
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
        Socket.Auth.RegisterSocket(data.user);
      }
    });
  };

  // Create the deck and reload the page to refresh.
  // TODO: Don't see why this is passed down as a prop.
  const handleDeckCreate = (deckObj) => {
    API.createDeck(deckObj).then((data) => {
      window.location.reload();
    });
  };

  // Logout the user and clear items from state and local storage.
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(0);
    setToken('');
    // TODO: Socket.Auth stuff?

  };

  // Starts the particles engine.
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);


  // Renders the actual site once logged in.
  const renderRoutes = () => {
    return (
      <>
        {/* Router links to nav for page traversal */}
        <Router>
          <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
            {/* Navigation (Visible on every page.) */}
            <Nav view={view} setView={setView} handleLogout={handleLogout} />
            {/* Main Content */}
            <div id="routeContainer" className="w-full h-full overflow-x-hidden gl-scrollbar">
              {/* Particles Component */}
              <Particles init={particlesInit} options={options} />
              {/* Page Routes */}
              <Routes>
                {/* LOBBY */}
                <Route path="/" element={<Lobby />} />
                <Route path="/lobby" element={<Lobby userId={userId} />} />
                {/* PLAY */}
                <Route path="/gameview" element={<Gameview />} />
                {/* DECKBUILDER */}
                <Route path="/deckbuilder" element={ <Deckbuilder userId={userId} handleDeckCreate={handleDeckCreate} token={token} />} />
                {/* PROFILE */}
                <Route path="/profile" element={<Profile userId={userId} token={token} setIsLoggedIn={setIsLoggedIn} />} />
                {/* FRIENDS */}
                <Route path="/friends" element={<Friends userId={userId} token={token} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </>
    );
  };

  return (
    <div className="w-screen h-screen">
      {/* If we are logged in, access the site, else serve login screen */}
      {isLoggedIn ? (renderRoutes()) : (
        <>
          {/* Particles */}
          <Particles init={particlesInit} options={options} />
          {/* Login Screen*/}
          <Login handleLogin={handleLogin} handleSignup={handleSignup} isValidLogin={isValidLogin} isValidSignup={isValidSignup} />
        </>
      )}
    </div>
  );
}

export default App;
