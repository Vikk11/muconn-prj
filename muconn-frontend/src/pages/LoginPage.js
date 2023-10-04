import React, { useState } from 'react'
import "../styles/LoginPage.css";
import logo from "../assets/logo.png";
import Login from "../components/Login";
import Signup from "../components/Signup";

function LoginPage() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="login-page">
      <div className="header-form-container">
        <div className="header-container">
          <div className ="header-logo-container">
            <div className="image">
              <img src={logo}></img>
            </div>
            <div className="text">
              <h1>Muconn</h1>
            </div>
          </div>
          <h2>Music that Connects Us All</h2>
          <p>Stream. Share. Connect</p>
        </div>
        <div className="form-container">
          <h1>Log in</h1>
          <Login/>
          <p>New here? <button onClick={openPopup}>Sign up</button></p>
          <Signup isOpen={isPopupOpen} onClose={closePopup}></Signup>
        </div>
      </div>
    </div>
  )
}

export default LoginPage