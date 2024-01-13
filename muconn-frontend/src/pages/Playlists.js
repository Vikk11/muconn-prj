import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import useAuth from '../hooks/useAuth'; 
import axios from 'axios';
import RightNav from "../components/RightNav";

function Playlists() {
  const { loginSuccess } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const navigate = useNavigate();

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
      await fetchUserPlaylists(response.data.id)
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  const fetchUserPlaylists = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/playlists/user/${userId}`); 
      const data = await response.json();

      setUserPlaylists(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };
  
  return (
    <div>
      <LeftNav></LeftNav>
      <div>
        <h1 className="artist-name">{userDetails ? userDetails.username + "'s Playlists" : 'Loading...'}</h1>
        <section className={loginSuccess ? "loggedin-section" : "album-section"}>
        <div className="section-title">
        </div>
        <div className={loginSuccess ? "loggedin-albums-container-section" : "albums-container-section"}>
        {userPlaylists.map((playlist) => (
            <Link to={`/user/playlist/${playlist.id}`} className="box">
            <img src={`http://localhost:8080/images/albums/${playlist.image}`} className="box-img"/>
            <div className="box-text">
              <h2>{playlist.title}</h2>
            </div>
            </Link>
        ))}
        </div>
      </section>
      </div>
      {loginSuccess ? (
         <>
          <RightNav />
          <button className="profile-btn" onClick={handleProfileButtonClick}><i class='bx bxs-user'></i></button>
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default Playlists