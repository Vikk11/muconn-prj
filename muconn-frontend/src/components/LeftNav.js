import React, { useState, useEffect }  from 'react'
import "../styles/Navigation.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from "../assets/logo.png";
import useAuth from '../hooks/useAuth'; 
import axios from 'axios';
import PlaylistPopup from "../components/PlaylistPopup";

function LeftNav({ visible, onClose }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { loginSuccess } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loggedUserPlaylists, setLoggedUserPlaylists] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const username = localStorage.getItem('loggedInUser');
  
      if (!username) {
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/users/user/details/${username}`, {
        withCredentials: true,
      });
  
      setUserDetails(response.data);
      await fetchLoggedUserPlaylists(response.data.id);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  const fetchLoggedUserPlaylists = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/playlists/user/${userId}`); 
      const data = await response.json();

      setLoggedUserPlaylists(data); 
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handlePlaylistsClick = async () => {
    if (!loginSuccess) {
      setShowLoginAlert(true);
    } else {
      try {
        navigate('/playlists', {});
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
        <Link to="/likedSongs" className={activeLink === '/likedsongs' ? 'active-link' : ''}><i className='bx bxs-heart'></i>Liked Songs</Link>
        <Link to="/search" className={activeLink === '/recentlyplayed' ? 'active-link' : ''}><i className='bx bx-history' ></i>Recently Played</Link>
        <p className="nav-title">YOUR PLAYLISTS</p>
        <button className="create-playlist-btn" onClick={openPopup}><i class='bx bxs-plus-square'></i>Create Playlist</button>
        <PlaylistPopup isOpen={showPopup} onClose={closePopup}></PlaylistPopup>
        {loggedUserPlaylists.map((playlist) => (
          <Link to={`/${userDetails.username}/playlist/${playlist.id}`} className="playlist-link" >{playlist.title}</Link>
        ))}
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