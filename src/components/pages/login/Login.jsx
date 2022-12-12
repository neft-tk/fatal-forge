import React, { useState } from 'react';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import blacksmithGif from '../../../assets/gif/blacksmith_nobg.gif';
import visibilityIcon from '../../../assets/svg/visibilityIcon.svg';
// The Login component provides a form and handler for users logging in.

// import API from "./utils/API.js";

/*
this was all copy pasted stuff that erik pulled from joes example

i passed the setlogin state function through the props from the app component..
that's the only change i made.
*/

export default function Login({ setIsLoggedIn, handleLogin, handleSignup }) {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const onLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const onLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const onUsernameChange = (e) => {
    setSignupUsername(e.target.value);
  };

  const onSignupEmailChange = (e) => {
    setSignupEmail(e.target.value);
  };

  const onSignPasswordChange = (e) => {
    setSignupPassword(e.target.value);
  };

  const onModalClick = (e) => {
    setShowModal(true);
  };

  const onModalClose = (e) => {
    setShowModal(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email: loginEmail,
      password: loginPassword,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup clicked!');
    handleSignup({
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    });
  };

  return (
    <div className="h-full flex sm:flex-row flex-col">
      <div className="ml-8 flex flex-col justify-center items-center text-center sm:w-1/4 w-full">
        <form onSubmit={handleLoginSubmit} className="flex flex-col">
          <h3 className="pt-6 text-cyan-400">Login</h3>

          <input
            id="login-email"
            name="login-email"
            placeholder="email"
            value={loginEmail}
            onChange={onLoginEmailChange}
            className="text-black p-2 m-4 rounded"
          />

          <div className="relative m-4">
            <input
              id="login-password"
              name="login-password"
              placeholder="password"
              value={loginPassword}
              type={showPassword ? 'text' : 'password'}
              onChange={onLoginPasswordChange}
              className="text-black p-2 rounded"
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="cursor-pointer absolute p-4 -top-2 -right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <button
            type="submit"
            className="m-4 text-black bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-300"
          >
            Login
          </button>
        </form>

        <>
          <h3 className="m-4">
            New here?{' '}
            <span
              onClick={onModalClick}
              className="text-cyan-400 cursor-pointer"
            >
              Sign up to play!
            </span>
          </h3>
          <Modal show={showModal} size="md" popup={true} onClose={onModalClose}>
            <Modal.Header className="bg-slate-600" />
            <Modal.Body className="bg-slate-500">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 justify-center items-center text-center">
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Welcome Adventurer! Tell us about yourself...
                </h3>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Your username:" />
                  </div>
                  <input
                    id="signup-username"
                    name="signup-username"
                    placeholder="Adventurer"
                    required={true}
                    value={signupUsername}
                    onChange={onUsernameChange}
                    className="text-black p-2 mt-4 rounded text-center w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email:" />
                  </div>
                  <input
                    id="signup-email"
                    name="signup-email"
                    placeholder="adventurer@fatalforge.com"
                    required={true}
                    value={signupEmail}
                    onChange={onSignupEmailChange}
                    className="text-black p-2 mt-4 rounded text-center w-full"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password:" />
                  </div>
                  <input
                    id="signup-password"
                    name="signup-password"
                    type="password"
                    required={true}
                    value={signupPassword}
                    onChange={onSignPasswordChange}
                    className="text-black p-2 mt-4 rounded text-center w-full"
                  />
                </div>
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleSignupSubmit}
                    className="m-4 text-black bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-300"
                  >
                    Sign Up!
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>

      <div className="flex p-4 sm:w-3/4 w-full justify-center items-center">
        <img src={blacksmithGif} alt="A blacksmith hard at work." />
      </div>
    </div>
  );
}
