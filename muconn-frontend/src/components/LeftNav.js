import React, { useState, useEffect }  from 'react'
import "../styles/Navigation.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from "../assets/logo.png";
import SmallPopup from "../components/SignupPopup";
import axios from 'axios';

function LeftNav({ visible, onClose }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
    checkLoggedIn();
  }, [location]);

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
        return Promise.reject('Authentication failed');
      }
    } catch (error) {
      setLoginSuccess(false);
      return Promise.reject(error);
    }
  };

  const handlePlaylistsClick = async () => {
    if (!loginSuccess) {
      setShowLoginAlert(true);
    } else {
      try {
        await checkLoggedIn();
        navigate('/playlists');
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    }
  };


  return (
    <div className={`leftSideNav ${visible ? 'visible' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        <i className='bx bx-x'></i>
      </button>
      <img src={logo} className="navLogo"/>
      <Link to="/" className={activeLink === '/' ? 'active-link' : ''}><i className='bx bxs-home'></i>Home</Link>
      <Link to="/search" className={activeLink === '/search' ? 'active-link' : ''}><i className='bx bx-search'></i>Search</Link>
      <Link onClick={handlePlaylistsClick} className={activeLink === '/playlists' ? 'active-link' : ''}><i className='bx bxs-playlist'></i>Playlists</Link>
      {loginSuccess ? (
      <>
        <p className="nav-title">YOUR MUSIC</p>
        <Link to="/" className={activeLink === '/likedsongs' ? 'active-link' : ''}><i className='bx bxs-heart'></i>Liked Songs</Link>
        <Link to="/search" className={activeLink === '/recentlyplayed' ? 'active-link' : ''}><i className='bx bx-history' ></i>Recently Played</Link>
        <p className="nav-title">YOUR PLAYLISTS</p>
      </>
  ) : null}
      {showLoginAlert && (
        <div className="login-alert">
          <p>Log in to create a playlist</p>
          <button onClick={() => setShowLoginAlert(false)}>&#10005;</button>
        </div>
      )}
    </div>
  );
}

export default LeftNav