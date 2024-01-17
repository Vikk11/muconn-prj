import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Popup.css";
import axios from 'axios';

const EditPopup = ({isOpen, onClose}) => {
  const [newUsername, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
      navigate("/profile")
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChangeUsername = async () => {
    try {
      console.log('User ID:', userDetails.id);
      const editUsername = newUsername
  
      const response = await axios.put(`http://localhost:8080/api/users/${userDetails.id}/edit-username`, editUsername,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
  
      if (response.status === 200) {
        console.log('Username changed successfully. Response:',  response.data);
        localStorage.setItem('loggedInUser', editUsername);
        onClose();
        
      } else {
        console.error('Unexpected status code. Response:', response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log('HTTP request failed with status 400. Error:', error.response.data);
          setError(error.response.data);
        }
      } else {
        console.error('An error occurred:', error.message);
      }
    } 
  }

  if (!isOpen) return null;
  return (
    <div className="profile-popup-overlay">
      <div className="popup-edit">
        <button className="edit-close-btn" onClick={onClose}>&#10005;</button>
        
        {error && <div className="error-message">{error}</div>}
        <label>Username</label>
        <input type="text" value={newUsername} placeholder="New Username" onChange={(e) => setUsername(e.target.value)}/>
        <button className="edit-confirm-button" onClick={handleChangeUsername}>Confirm</button>
      </div>
    </div>
  )
}

export default EditPopup