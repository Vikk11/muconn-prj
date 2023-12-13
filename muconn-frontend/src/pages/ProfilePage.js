import React, { useState, useEffect } from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import image from "../assets/profile.png";
import "../styles/ProfilePage.css"
import Playlists from "../components/UserPlaylists";
import useAuth from '../hooks/useAuth';
import axios from 'axios';

function ProfilePage() {
  const { loginSuccess } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

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

  return (
    <div>
      <LeftNav></LeftNav>
      <div className="profile-container">
          <img src={image}></img>
          {userDetails ? (
          <div>
            <h1>{userDetails.username}</h1>
          </div>
          ) : (
            <h1>Username</h1>
          )}
          {loginSuccess ? (
          <>
            {userDetails ? (
            <div>
              <button><i class='bx bxs-pencil'></i></button>
            </div>
            ) : (
              <button><i class='bx bxs-user-plus' ></i></button>
            )}
          </>
          ) : (
            null
          )}
      </div>
      <Playlists></Playlists>
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