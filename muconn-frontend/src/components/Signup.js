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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      return;
    }
    
    try {
      const { email, username, password } = formData;
      console.log('Sending HTTP request with data:', { email, username, password });

      const response = await axios.post('http://localhost:8080/api/users/signup', { email, username, password });
      console.log('HTTP request successful. Response:', response.data);

      setSignupSuccess(true);
      setFormData({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      setError('');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log('HTTP request failed with status 400. Error:', error.response.data);
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