import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/Album.css"
import AlbumDetails from "../components/AlbumDetails";
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';

function Album() {
  const { albumTitle } = useParams();
  console.log('Album Title', albumTitle);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

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

  const handleProfileButtonClick = () => {
    navigate('/profile');
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
          <button className="profile-btn" onClick={handleProfileButtonClick}><i class='bx bxs-user'></i></button>
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default Album