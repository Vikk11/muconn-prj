import React, { useState, useEffect } from 'react'
import topHits from "../assets/top-hits.png";
import {Link} from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth'; 

function UserPlaylists({username}) {
  const [userDetails, setUserDetails] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { loginSuccess } = useAuth();

  const fetchUserDetails = async () => {
    try {
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
      const response = await fetch(`http://localhost:8080/api/playlists/user/${userDetails.id}`); 
      const data = await response.json();

      setUserPlaylists(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if(userDetails){
      fetchUserPlaylists();
    }
  }, [userDetails]);

  return (
    <div>
        <section className={loginSuccess ? "loggedin-section" : "album-section"}>
        <div className="section-title">
          <h1>Playlists</h1>
          <Link to={`/playlists/${username}`} className="small-link">
            See more
          </Link>
        </div>
        <div className={loginSuccess ? "logged-in-container-section" : "container-section"}>
          {userDetails && (
            <>
              {userPlaylists.map((playlist) => (
              <Link to={`/user/playlist/${playlist.id}`} className="box" key={playlist.id}>
                <img src={`http://localhost:8080/images/playlists/${playlist.image}`} className="box-img"/>
                <div className="box-text">
                  <h2>{playlist.title}</h2>
                </div>
              </Link>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default UserPlaylists