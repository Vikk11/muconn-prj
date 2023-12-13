import React, { useState, useEffect }  from 'react'
import "../styles/Navigation.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from "../assets/logo.png";
import useAuth from '../hooks/useAuth'; 
import PlaylistPopup from "../components/PlaylistPopup";

function LeftNav({ visible, onClose }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { loginSuccess } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handlePlaylistsClick = async () => {
    if (!loginSuccess) {
      setShowLoginAlert(true);
    } else {
      try {
        navigate('/playlists');
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
        <button className="create-playlist-btn" onClick={openPopup}><i class='bx bxs-plus-square'></i>Create Playlist</button>
        <PlaylistPopup isOpen={showPopup} onClose={closePopup}></PlaylistPopup>
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