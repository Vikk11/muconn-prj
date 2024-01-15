import React, { useState, useEffect } from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import image from "../assets/profile.png";
import "../styles/ProfilePage.css"
import Playlists from "../components/UserPlaylists";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import EditPopup from "../components/EditPopup";

function ProfilePage() {
  const { loginSuccess } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <LeftNav></LeftNav>
      <div className="profile-container">
        {userDetails && (
          <>
            <img src={image}></img>
              <div>
                <h1>{userDetails.username}</h1>
              </div>
              <div>
              <button onClick={openPopup}><i class='bx bxs-pencil'></i></button>
              <EditPopup isOpen={showPopup} onClose={closePopup}></EditPopup>
            </div>
          </>
        )}
      </div>
      {userDetails && (
         <Playlists username = {userDetails.username}></Playlists>
       )}
      {loginSuccess ? (
         <>
          <RightNav />
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default ProfilePage