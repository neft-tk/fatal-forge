import React, { useState } from 'react';
import { Modal, Label, Tooltip } from 'flowbite-react';
import blacksmithGif from '../../../assets/gif/blacksmith_nobg.gif';
import visibilityIcon from '../../../assets/svg/visibilityIcon.svg';
// The Login component provides a form and handler for users logging in.

// import API from "./utils/API.js";

/*
this was all copy pasted stuff that erik pulled from joes example

i passed the setlogin state function through the props from the app component..
that's the only change i made.
*/

export default function Login({
  handleLogin,
  handleSignup,
  isValidLogin,
  isValidSignup,
}) {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
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

  const onSignupModalClick = (e) => {
    setShowSignupModal(true);
  };

  const onSignupModalClose = (e) => {
    setShowSignupModal(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginEmail('');
    setLoginPassword('');
    handleLogin({
      email: loginEmail,
      password: loginPassword,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    handleSignup({
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    });
  };

  return (
    <div className="h-full w-2/3 flex lg:flex-row flex-col justify-between mx-auto my-0">
      <div className="ml-8 flex flex-col justify-center items-center text-center lg:w-1/4 w-full">
        <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
          <h3 className="pt-6 text-main-orange font-display-text-f">Login</h3>

          <input
            id="login-email"
            name="login-email"
            placeholder={`${isValidLogin ? 'Email' : 'Wrong Email/Password'}`}
            value={loginEmail}
            onChange={onLoginEmailChange}
            className={`text-black p-2 m-4 rounded font-alt-text-f ${
              isValidLogin ? '' : 'error-input'
            }`}
          />

          <div className="relative m-4">
            <input
              id="login-password"
              name="login-password"
              placeholder={`${
                isValidLogin ? 'Password' : 'Wrong Email/Password'
              }`}
              value={loginPassword}
              type={showPassword ? 'text' : 'password'}
              onChange={onLoginPasswordChange}
              className={`text-black p-2 rounded font-alt-text-f w-full ${
                isValidLogin ? '' : 'error-input'
              }`}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="cursor-pointer absolute p-4 -top-2 -right-2"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <button type="submit" className="button-style">
            Login
          </button>
        </form>
        <p
          className={`mt-2 text-sm text-red-600 dark:text-red-500 ${
            isValidLogin ? 'hidden' : 'block'
          }`}
        >
          {' '}
          Username or password invalid.
        </p>

        <>
          <h3 className="m-4 font-alt-text-f">
            <span className="mr-4">New here?</span>
            <span
              onClick={onSignupModalClick}
              className="text-highlight-orange hover:text-active-orange transition hover:text-lg duration-300 ease-in-out cursor-pointer"
            >
              Sign up to play!
            </span>
          </h3>
          <Modal
            show={showSignupModal}
            size="md"
            popup={true}
            onClose={onSignupModalClose}
          >
            <Modal.Header className="bg-slate-600" />
            <Modal.Body className="bg-slate-300">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 justify-center items-center text-center">
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Welcome Adventurer! Tell us about yourself...
                </h3>
                <div className="w-full flex justify-center">
                  <Tooltip content="Can't be blank." placement="bottom">
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
                      className={`text-black p-2 mt-4 rounded text-center w-full ${
                        isValidSignup ? '' : 'error-input'
                      }`}
                    />
                  </Tooltip>
                </div>
                <div className="w-full flex justify-center">
                  <Tooltip content="Must be a valid email." placement="bottom">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your email:" />
                    </div>
                    <input
                      id="signup-email"
                      name="signup-email"
                      placeholder="adventurer@mail.com"
                      required={true}
                      value={signupEmail}
                      onChange={onSignupEmailChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full ${
                        isValidSignup ? '' : 'error-input'
                      }`}
                    />
                  </Tooltip>
                </div>
                <div className="w-full flex justify-center">
                  <Tooltip content="Must be 8 or more characters." placement="bottom">
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
                      className={`text-black p-2 mt-4 rounded text-center w-full ${
                        isValidSignup ? '' : 'error-input'
                      }`}
                    />
                  </Tooltip>
                </div>
                <p
                  className={`mt-2 text-sm text-red-600 dark:text-red-500 ${
                    isValidSignup ? 'hidden' : 'block'
                  }`}
                >
                  {' '}
                  Email or password didn't pass validation.
                </p>
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleSignupSubmit}
                    className="button-style"
                  >
                    Sign Up!
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>

      <div className="flex justify-center items-center min-w-50 lg:ml-12">
        <img
          className="min-w-full"
          src={blacksmithGif}
          alt="A blacksmith hard at work."
        />
      </div>
    </div>
  );
}
