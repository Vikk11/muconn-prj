import React, { useState, useEffect }  from 'react'
import "../styles/Navigation.css";
import {Link, useLocation} from 'react-router-dom';
import logo from "../assets/logo.png";
import SmallPopup from "../components/SignupPopup";

function LeftNav({ visible, onClose }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
    checkLoggedIn();
  }, [location]);

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (token) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
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
      <Link to="/playlists" className={activeLink === '/playlists' ? 'active-link' : ''}><i className='bx bxs-playlist'></i>Playlists</Link>
      {loginSuccess ? (
      <>
        <p className="nav-title">YOUR MUSIC</p>
        <Link to="/" className={activeLink === '/likedsongs' ? 'active-link' : ''}><i className='bx bxs-heart'></i>Liked Songs</Link>
        <Link to="/search" className={activeLink === '/recentlyplayed' ? 'active-link' : ''}><i className='bx bx-history' ></i>Recently Played</Link>
        <p className="nav-title">YOUR PLAYLISTS</p>
      </>
  ) : null}
    </div>
  );
}

export default LeftNav