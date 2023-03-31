import React, { useState } from 'react';
// Modal package
import { Modal, Label, Tooltip } from 'flowbite-react';
// Icons
import blacksmithGif from '../../../assets/gif/blacksmith_nobg.gif';
import visibilityIcon from '../../../assets/svg/visibilityIcon.svg';

// The Login component allows the user to login, login as guest or signup for a new account.

export default function Login({ handleLogin, handleSignup, isValidLogin, isValidSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [guestUsername, setGuestUsername] = useState('');
  // Modal toggles for signup and guest login.
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // State change handlers for login and signup fields.
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

  // Modal toggles for signup and guest login.
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

  // Reset login fields and pass login info to parent component (App)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginEmail('');
    setLoginPassword('');
    handleLogin({
      email: loginEmail.toLowerCase(),
      password: loginPassword,
    });
  };

  // Reset signup fields and pass signup info to parent component (App)
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

  // Create a guest account
  const handleGuestSignupSubmit = (e) => {
    e.preventDefault();
    // Reset guest username
    setGuestUsername('');
    // Generate a random number to use as an email
    let randNum = Math.floor(Math.random() * 10000);
    // Signup with a random email and generic password.
    handleSignup({
      username: guestUsername.toLowerCase(),
      email: randNum + "@gridlocke.guest",
      password: "password",
    })
  }

  return (
    <div className="h-full w-full flex md:flex-row flex-col justify-around items-center py-4">
      <div className="flex flex-col center-all w-96 shrink-0">
        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col w-full">
          {/* Email */}
          <input
            id="login-email"
            name="login-email"
            placeholder={`${isValidLogin ? 'Email' : 'Wrong Email/Password'}`}
            value={loginEmail}
            onChange={onLoginEmailChange}
            className={`text-black p-2 m-4 rounded font-alt-text-f ${isValidLogin ? '' : 'error-input'
              }`}
          />
          {/* Password */}
          <div className="relative m-4">
            {/* Input */}
            <input
              id="login-password"
              name="login-password"
              placeholder={`${isValidLogin ? 'Password' : 'Wrong Email/Password'
                }`}
              value={loginPassword}
              // Shows password if toggled
              type={showPassword ? 'text' : 'password'}
              onChange={onLoginPasswordChange}
              className={`text-black p-2 rounded font-alt-text-f w-full ${isValidLogin ? '' : 'error-input'
                }`}
            />
            {/* Password Visibility Toggle */}
            <img src={visibilityIcon} alt="show password" className="cursor-pointer absolute p-4 -top-2 -right-2" onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          {/* Login button submits the form */}
          <button type="submit" className="button-style">Login</button>
        </form>
        {/* Message shows when login is invalid */}
        <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidLogin ? 'hidden' : 'block'}`}>Username or password invalid.</p>
        {/* Signup and Guest Options */}
        <>
          {/* Sign up button opens the signup modal */}
          <div className="m-4 font-alt-text-f">
            <span className="mr-4">New here?</span>
            <span onClick={onSignupModalClick} className="text-highlight-blue font-bold cursor-pointer">Sign up to play!</span>
          </div>
          {/* Guest button opens the guest modal*/}
          <span onClick={onGuestModalClick} className="button-style bg-blue-500">Play as a guest!</span>
          {/* Signup Modal */}
          <Modal
            show={showSignupModal}
            size="md"
            popup={true}
            onClose={onSignupModalClose}
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 center-all">
                {/* Signup Heading */}
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Welcome Adventurer! Tell us about yourself...
                </h3>
                {/* Signup Username Field */}
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
                {/* Signup Email Field */}
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
                {/* Signup Password Field */}
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
                {/* Message shows on invalid signup */}
                <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidSignup ? 'hidden' : 'block'}`}>Email or password didn't pass validation.</p>
                {/* Signup Submit Button */}
                <div className="w-full">
                  <button type="button" onClick={handleSignupSubmit} className="button-style">Sign Up!</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* Guest Modal */}
          <Modal
            show={showGuestModal}
            size="md"
            popup={true}
            onClose={onGuestModalClose}
          >
            <Modal.Header className="modal-header" />
            <Modal.Body className="modal-body">
              <div className="flex flex-col space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 center-all">
                {/* Form Heading */}
                <h3 className="mt-4 text-lg font-medium text-gray-900">Welcome Guest Adventurer! Tell us about yourself... You can commit to making your account later!</h3>
                {/* Guest Username Field */}
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
                {/* Shows a message if the username is already in use. */}
                <p className={`mt-2 text-sm text-red-600 dark:text-red-500 ${isValidSignup ? 'hidden' : 'block'}`}>Username is already in use, please choose another username.</p>
                <div className="w-full">
                  <button type="button" onClick={handleGuestSignupSubmit} className="button-style">Sign Up as A Guest!</button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>
      {/* Griddy the blacksmith */}
      <img className="flex shrink min-w-0 min-h-0" src={blacksmithGif} alt="A blacksmith hard at work."/>
    </div>
  );
}
