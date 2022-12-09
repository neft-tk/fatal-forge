import blacksmithGif from '../../assets/gif/blacksmith_nobg.gif';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
// The Login component provides a form and handler for users logging in.

import { useEffect, useState } from 'react';
// import API from "./utils/API.js";

/*
this was all copy pasted stuff that erik pulled from joes example

i passed the setlogin state function through the props from the app component..
that's the only change i made.
*/

export default function Login({setIsLoggedIn, handleLogin}) {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // useEffect(() => {
  //   // const storedToken = localStorage.getItem("token")
  //   // if(storedToken){
  //   //   console.log(storedToken)
  //   //   API.getUserFromToken(storedToken).then(data=>{
  //   //     if(data.user){
  //   //       console.log(data)
  //   //       setToken(storedToken)
  //   //       props.setIsLoggedIn(true)
  //   //       setUserId(data.user.id)
  //   //     }
  //   //   })
  //   // } else {
  //   //   console.log('no stored token')
  //   // }
  // }, []);

  const onEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // console.log("Button has been clicked!");
    handleLogin({
      email: loginEmail,
      password: loginPassword
    });
  };

  // const handleLogout = () => {
  //   // localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   // setUserId(0);
  //   // setToken("");
  // };

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flex justify-center items-center text-center sm:w-1/4 w-full">
        <form onSubmit={handleLoginSubmit} className="flex flex-col">

          <h3 className="text-cyan-400">Login</h3>

          <input
            name="email"
            value={loginEmail}
            placeholder="email"
            onChange={onEmailChange}
            className="text-black p-2"
          />

          <div className="relative m-0">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginPassword}
              placeholder="password"
              onChange={onPasswordChange}
              className="text-black p-2"
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
            className="text-black bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-500 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-300"
          >
            Login
          </button>

        </form>
      </div>

      <div className="flex p-4 sm:w-3/4 w-full justify-center items-center">
        <img src={blacksmithGif} alt="A blacksmith hard at work." />
      </div>
    </div>
  );
}
