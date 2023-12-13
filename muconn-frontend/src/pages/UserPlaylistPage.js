import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "../styles/PlaylistPage.css";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import PlaylistSong from "../components/PlaylistSong";
import useAuth from '../hooks/useAuth'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserPlaylistPage() {
    const [leftNavVisible, setLeftNavVisible] = useState(false);
    const { playlistId } = useParams();
    console.log('Playlist ID:', playlistId);
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const { loginSuccess } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
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
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUserDetails(null);
      }
    };
  
    useEffect(() => {
      const fetchPlaylistDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/playlists/user/${userDetails.id}/playlist/${playlistId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          setPlaylistDetails(data);
        } catch (error) {
          console.error('Error fetching playlist details:', error);
          console.error('Error details:', error.message);
          console.error('Error stack:', error.stack);
        }
      };

      fetchUserDetails();
      fetchPlaylistDetails();
    }, [playlistId]);

    
    const handleProfileButtonClick = () => {
      navigate('/profile');
    };
  
    if (playlistDetails === null) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <button className="mobile-nav-toggle" onClick={() => setLeftNavVisible(!leftNavVisible)}>
          <i className='bx bx-menu'></i>
        </button>
          <LeftNav visible={leftNavVisible} onClose={() => setLeftNavVisible(false)}></LeftNav>
          <div className = "playlist-background">
              <div className={loginSuccess ? "loggedin-playlist-cover" : "playlist-cover"}>
                  <img src={`http://localhost:8080/images/playlists/${playlistDetails.image}`} />
                  <h2>{playlistDetails.title}</h2>
              </div>  
          </div>
          <div className={loginSuccess ? "loggedin-playlist-buttons-container" : "playlist-buttons-container"}>
            <button><i class='bx bx-play'></i></button>
            <button><i class='bx bx-shuffle' ></i></button>
            <button><i class='bx bx-sort-alt-2' ></i></button>
            <input type="text" className={loginSuccess ? "loggedin-wide-text-box" : "wide-text-box"} placeholder="Search in playlist"/>
            <button><i class='bx bx-search' ></i></button>
          </div> 
          <div className="playlist-songs-container">
            <PlaylistSong playlistId={playlistDetails.id}></PlaylistSong>
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

export default UserPlaylistPage