import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import axios from 'axios';

function Login() {
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loginUsername: '',
    loginPassword: '',
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
      const { loginUsername, loginPassword } = formData;
      const response = await axios.post('http://localhost:8080/api/users/login', { username: loginUsername, password: loginPassword }, { withCredentials: true });
      const { username } = response.data;
      localStorage.setItem('loggedInUser', username);
      const { refreshToken } = response.data;
      localStorage.setItem('refreshToken', refreshToken);

      setLoginSuccess(true);
      setFormData({
        loginUsername: '',
        loginPassword: '',
      });
      setError('');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); 
        if (error.response.status === 401) {
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
          <label htmlFor="loginUsername">Username</label>
          <input name="loginUsername" type="text" value={formData.loginUsername} onChange={handleChange}/>
          <label htmlFor="loginPassword">Password</label>
          <input name="loginPassword" type="password" value={formData.loginPassword} onChange={handleChange}/>
          <button type="submit" className="btn-submit">Log in</button>
      </form>
    </div>
  )
}

export default Login