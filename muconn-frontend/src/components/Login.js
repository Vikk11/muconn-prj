import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import axios from 'axios';

function Login() {
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = formData;
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
      setLoginSuccess(true);
      setFormData({
        username: '',
        password: '',
      });
      setError('');
      navigate('/');
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
  
  return (
    <div className="login-form">
      <form id="loginForm" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <label htmlFor="username">Username</label>
          <input name="username" type="text" value={formData.username} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange}/>
          <button type="submit" className="btn-submit">Log in</button>
      </form>
    </div>
  )
}

export default Login