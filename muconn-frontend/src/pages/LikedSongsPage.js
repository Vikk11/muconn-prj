import React from 'react';
import LeftNav from "../components/LeftNav";
import "../styles/PlaylistPage.css";
import useAuth from '../hooks/useAuth'; 
import image from "../assets/liked-songs.png";
import RightNav from "../components/RightNav";
import { useNavigate } from 'react-router-dom';
import LikedSongs from "../components/LikedSongs";

function LikedSongsPage() {
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <div>
        <LeftNav></LeftNav>
        <div className = "playlist-background">
            <div className={loginSuccess ? "loggedin-playlist-cover" : "playlist-cover"}>
                <img src={image} />
                <h2>Liked Songs</h2>
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
          <LikedSongs></LikedSongs>
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

export default LikedSongsPage