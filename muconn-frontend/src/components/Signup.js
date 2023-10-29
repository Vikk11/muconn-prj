import React, { useState } from 'react'
import axios from 'axios';
import Popup from "../components/Popup";
import "../styles/Signup.css";

const Signup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isSignupSuccess, setSignupSuccess] = useState(false);
  const [isEmailValid, setsValidEmail] = useState(true);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      setPasswordsMatch(value === formData.password);
    }

    if (name === 'email'){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setsValidEmail(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      return;
    }

    if (!isEmailValid) {
      setError('Invalid email format');
      return;
    }

    try {
      const { email, username, password } = formData;
      const response = await axios.post('http://localhost:8080/api/users/signup', { email, username, password });
      setSignupSuccess(true);
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError(error.response.data);
        }
      } else {
        console.error('An error occurred:', error.message);
      }
    }
  };

  const closeSignupPopup = () => {
    onClose();
    setSignupSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="signup-form">
          <button className="close-button" onClick={onClose}>x</button>
          <h1 className ="signup-title">Sign up</h1>
          <form id="signupForm" onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              <label htmlFor="email">Email</label>
              <input name="email" type="text" value={formData.email} onChange={handleChange}/>
              <label htmlFor="username">Username</label>
              <input name="username" type="text" value={formData.username} onChange={handleChange}/>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange}/>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}/>
              {!passwordsMatch && <p className="error-message">Passwords do not match</p>}
              <button type="submit" className="btn-submit">Sign up</button>
              <Popup isOpen={isSignupSuccess} onClose={closeSignupPopup}></Popup>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup