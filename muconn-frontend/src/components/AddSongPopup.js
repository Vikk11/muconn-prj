import React, {useState, useEffect} from 'react'
import "../styles/Popup.css";
import axios from 'axios';
import "../styles/Popup.css"
import ConfirmationPopup from "../components/ConfirmationPopup"

const AddSongPopup = ({ isOpen, onClose, songId}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

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

  const handleAddSong = async(playlistId) =>{
    try {
        const response = await axios.post(`http://localhost:8080/api/playlists/playlist/${playlistId}/addSong/${songId}`);
    
        if (response.status === 200) {
          console.log('Song added successfully. Response:',  response.data);
          setConfirmationPopupOpen(true);
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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="playlist-popup-overlay">
      <div className="popup-add">
        <button className="addsong-close-btn" onClick={onClose}>&#10005;</button>
        <h1 className="addsong-popup-message">Add song to playlist</h1>
        {userPlaylists.map((playlist) => (
          <button className="playlist-btn" onClick={() => handleAddSong(playlist.id)}>{playlist.title}</button>
        ))}
        <ConfirmationPopup isOpen={confirmationPopupOpen} onClose={() => setConfirmationPopupOpen(false)} />
      </div>
    </div>
  )
}

export default AddSongPopup