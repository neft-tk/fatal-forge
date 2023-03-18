import React, { useState } from 'react';
import { Modal, Label, Tooltip } from 'flowbite-react';
import blacksmithGif from '../../../assets/gif/blacksmith_nobg.gif';
import visibilityIcon from '../../../assets/svg/visibilityIcon.svg';

export default function Login({ handleLogin, handleSignup, isValidLogin, isValidSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [guestUsername, setGuestUsername] = useState('');

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

  const onGuestNameChange = (e) => {
    setGuestUsername(e.target.value)
  }

  const onSignupModalClick = (e) => {
    setShowSignupModal(true);
  };

  const onSignupModalClose = (e) => {
    setShowSignupModal(false);
  };

  const onGuestModalClick = (e) => {
    setShowGuestModal(true);
  }

  const onGuestModalClose = (e) => {
    setShowGuestModal(false);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginEmail('');
    setLoginPassword('');
    handleLogin({
      email: loginEmail.toLowerCase(),
      password: loginPassword,
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupUsername('');
    setSignupEmail('');
    setSignupPassword('');
    handleSignup({
      username: signupUsername.toLowerCase(),
      email: signupEmail.toLowerCase(),
      password: signupPassword,
    });
  };

  const handleGuestSignupSubmit = (e) => {
    e.preventDefault();
    setGuestUsername('');
    let randNum = Math.floor(Math.random() * 10000);
    handleSignup({
      username: guestUsername.toLowerCase(),
      email: randNum + "@gridlocke.net",
      password: "password",
    })
  }

  return (
    <div className="h-full w-full flex md:flex-row flex-col justify-around items-center py-4">
      <div className="flex flex-col center-all w-96 shrink-0">
        <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
          <input
            id="login-email"
            name="login-email"
            placeholder={`${isValidLogin ? 'Email' : 'Wrong Email/Password'}`}
            value={loginEmail}
            onChange={onLoginEmailChange}
            className={`text-black p-2 m-4 rounded font-alt-text-f ${isValidLogin ? '' : 'error-input'
              }`}
          />
          <div className="relative m-4">
            <input
              id="login-password"
              name="login-password"
              placeholder={`${isValidLogin ? 'Password' : 'Wrong Email/Password'
                }`}
              value={loginPassword}
              type={showPassword ? 'text' : 'password'}
              onChange={onLoginPasswordChange}
              className={`text-black p-2 rounded font-alt-text-f w-full ${isValidLogin ? '' : 'error-input'
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
        <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidLogin ? 'hidden' : 'block'}`}>
          {' '}
          Username or password invalid.
        </p>

        <>
          <h3 className="m-4 font-alt-text-f">
            <span className="mr-4">New here?</span>
            <span
              onClick={onSignupModalClick}
              className="text-highlight-blue font-bold cursor-pointer"
            >
              Sign up to play!
            </span>
            <span
              onClick={onGuestModalClick}
              className="text-highlight-blue font-bold cursor-pointer"
            >
              Play as a guest!
            </span>
          </h3>
          <Modal
            show={showSignupModal}
            size="md"
            popup={true}
            onClose={onSignupModalClose}
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 center-all">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
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
                      className={`text-black p-2 mt-4 rounded text-center w-full ${isValidSignup ? '' : 'error-input'
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
                      className={`text-black p-2 mt-4 rounded text-center w-full ${isValidSignup ? '' : 'error-input'
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
                      className={`text-black p-2 mt-4 rounded text-center w-full ${isValidSignup ? '' : 'error-input'
                        }`}
                    />
                  </Tooltip>
                </div>
                <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidSignup ? 'hidden' : 'block'}`}>
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
          <Modal
            show={showGuestModal}
            size="md"
            popup={true}
            onClose={onGuestModalClose}
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 center-all">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Welcome Guest Adventurer! Tell us about yourself... You can commit to making your account later!
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
                      value={guestUsername}
                      onChange={onGuestNameChange}
                      className={`text-black p-2 mt-4 rounded text-center w-full ${isValidSignup ? '' : 'error-input'
                        }`}
                    />
                  </Tooltip>
                </div>
                <div className="w-full flex justify-center">
                </div>
                <div className="w-full flex justify-center">
                </div>
                <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidSignup ? 'hidden' : 'block'}`}>
                  {' '}
                  Email or password didn't pass validation.
                </p>
                <div className="w-full">
                  <button
                    type="button"
                    onClick={handleGuestSignupSubmit}
                    className="button-style"
                  >
                    Sign Up as Guest!
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>
      <img
        className="flex shrink min-w-0 min-h-0"
        src={blacksmithGif}
        alt="A blacksmith hard at work."
      />
    </div>
  );
}
