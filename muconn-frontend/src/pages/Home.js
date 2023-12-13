import React, { useState, useEffect }from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import topHits from "../assets/top-hits.png"
import "../styles/Home.css"
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [leftNavVisible, setLeftNavVisible] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loggedUserPlaylists, setLoggedUserPlaylists] = useState([]);
  const { loginSuccess } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPlaylists();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchLoggedUserPlaylists();
  }, [userDetails]);

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
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  const fetchUserPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/playlists/user/5'); 
      const data = await response.json();

      setUserPlaylists(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  const fetchLoggedUserPlaylists = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/playlists/user/${userDetails.id}`); 
      const data = await response.json();

      setLoggedUserPlaylists(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };


  return (
    <div>
      <button className="mobile-nav-toggle" onClick={() => setLeftNavVisible(!leftNavVisible)}>
        <i className='bx bx-menu'></i>
      </button>
      <LeftNav visible={leftNavVisible} onClose={() => setLeftNavVisible(false)}/>
      {loginSuccess ? (
         <>
          <RightNav />
          <button className="profile-btn" onClick={handleProfileButtonClick}><i class='bx bxs-user'></i></button>
         </>
      ) : (
        <Link to="/login" className="login-btn">Log in</Link>
      )}
      <section className={loginSuccess ? "logged-in-section" : "default-section"}>
        <div className="section-title">
          <h1>Muconn Playlists</h1>
          <Link to={"/"} className="small-link">
            See more
          </Link>
        </div>
        <div className="scroll-container">
          <div className={loginSuccess ? "logged-in-container-section" : "container-section"}>
            {userPlaylists.map((playlist) => (
              <Link to={`/playlist/${playlist.id}`} className="box" key={playlist.id}>
                <img src={`http://localhost:8080/images/playlists/${playlist.image}`} className="box-img"/>
                <div className="box-text">
                  <h2>{playlist.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {loginSuccess ? (
        <section className={loginSuccess ? "loggedin-section" : "default-section"}>
        <div className="section-title">
          <h1>Your Playlists</h1>
          <Link to={"/"} className="small-link">
            See more
          </Link>
        </div>
        <div className="scroll-container">
          <div className={loginSuccess ? "loggedin-container-section" : "container-section"}>
            {loggedUserPlaylists.map((userPlaylist) => (
              <Link to={`/user/playlist/${userPlaylist.id}`} className="box" key={userPlaylist.id}>
                <img src={`http://localhost:8080/images/playlists/${userPlaylist.image}`} className="box-img"/>
                <div className="box-text">
                  <h2>{userPlaylist.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      ) : (
        <p className="preview-text">Sign up to get access to all features.</p>
      )}
    </div>
  )
}

export default Home