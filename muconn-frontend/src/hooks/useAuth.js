import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [loginSuccess, setLoginSuccess] = useState(false);

    const checkLoggedIn = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/users/check-auth', { withCredentials: true });
      
          if (response.status === 200) {
            setLoginSuccess(true);
          } else {
            await refreshAccessToken();
          }
        } catch (error) {
          setLoginSuccess(false);
        }
    };

    const refreshAccessToken = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
    
          if (!refreshToken) {
            setLoginSuccess(false);
            return;
          }
    
          const response = await axios.post('http://localhost:8080/api/users/refresh-token', { refreshToken: refreshToken}, { withCredentials: true });
      
          if (response.status === 200) {
            setLoginSuccess(true);
          } else {
            setLoginSuccess(false);
          }
        } catch (error) {
          setLoginSuccess(false);
        }
    };

    useEffect(() => {
      checkLoggedIn();
    }, []);

    useEffect(() => {
      checkLoggedIn();
    }, [loginSuccess]);
  
    return { loginSuccess };
  };
  
  export default useAuth;