import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/Album.css"
import topHits from "../assets/top-hits.png"
import AlbumDetails from "../components/AlbumDetails";
import axios from 'axios';

function Album() {
  const { albumTitle } = useParams();
  console.log('Album Title', albumTitle);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/albums/${albumTitle}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setAlbumDetails(data);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
      }
    };

    fetchAlbumDetails();
    fetchSongCount();
    checkLoggedIn();
  }, [albumTitle]);

  const fetchSongCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/songs/album/${albumTitle}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setSongCount(data.length);
      
      setAlbumSongs(data);
    } catch (error) {
      console.error('Error fetching playlist details:', error);
    }
  };

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

  if (albumDetails === null) {
    return <p>Loading...</p>;
  }
  return (
    <div>
        <LeftNav></LeftNav>
        <div className="album-info">
            <img src={`http://localhost:8080/images/albums/${albumDetails.coverImage}`} />
            <div className="album-details">
                <div className="album-title">{albumDetails.title}</div>
                <div className="album-artist">{albumDetails.artist.name} ● {songCount} {songCount === 1 ? 'song' : 'songs'}</div>
            </div>
        </div>
        <AlbumDetails albumTitle = {albumDetails.title}></AlbumDetails>
        {loginSuccess ? (
         <>
          <RightNav />
          <button className="profile-btn"><i class='bx bxs-user'></i></button>
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default Album