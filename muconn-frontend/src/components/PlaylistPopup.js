import React, { useState, useEffect } from 'react'
import "../styles/Popup.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaylistPopup = ({ isOpen, onClose}) => {
  const [playlistName, setPlaylistName] = useState('');
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
    fetchUserDetails();
  }, []);

  const handleSavePlaylist = async () => {
    try {
      console.log('User ID:', userDetails.id);
      
      const playlistDto = {
        user: userDetails, 
        title: playlistName,
      };
  
      const response = await axios.post('http://localhost:8080/api/playlists/createPlaylist', playlistDto);
  
      if (response.status === 200) {
        console.log('Playlist created successfully. Response:',  response.data);
        navigate('/');
        onClose();
      } else {
        console.error('Unexpected status code. Response:', response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log('HTTP request failed with status 400. Error:', error.response.data);
        }
      } else {
        console.error('An error occurred:', error.message);
      }
    } 
  }

  if (!isOpen) return null;
  return (
    <div className="playlist-popup-overlay">
      <div className="popup-create">
        <button className="playlist-close-btn" onClick={onClose}>&#10005;</button>
        <h1 className="popup-message">Create new playlist</h1>
        <label>Playlist Name</label>
        <input type="text" value={playlistName} placeholder="Enter name.." onChange={(e) => setPlaylistName(e.target.value)}/>
        <button className="playlist-confirm-button" onClick={handleSavePlaylist}>Confirm</button>
      </div>
    </div>
  )
}

export default PlaylistPopup