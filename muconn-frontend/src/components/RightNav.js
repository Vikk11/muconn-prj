import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Navigation.css";
import image from "../assets/profile.png";
import axios from 'axios';
import {Link} from 'react-router-dom';

function RightNav() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('message');
  const [userDetails, setUserDetails] = useState(null);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  
  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loggedInUser');  
    navigate('/login'); 
  };

  const fetchUserDetails = async () => {
    try {
      const username = localStorage.getItem('loggedInUser');
      console.log("user");
  
      if (!username) {
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/users/user/details/${username}`, {
        withCredentials: true,
      });
  
      setUserDetails(response.data);
      await fetchUserFollowing(response.data.id);
      await fetchUserFollower(response.data.id);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  const fetchUserFollowing = async (userId) => {
    try {
      const loggedInUserId = userId;
      console.log(loggedInUserId)
      

      const response = await axios.get(`http://localhost:8080/api/users/${loggedInUserId}/followings`, {
        withCredentials: true,
      });

      console.log(response.data)

      setUserFollowing(response.data);
    } catch (error) {
      console.error('Error checking if following:', error);
    }
  }

  const fetchUserFollower = async (userId) => {
    try {
      const loggedInUserId = userId;
      console.log(loggedInUserId)
      

      const response = await axios.get(`http://localhost:8080/api/users/${loggedInUserId}/followers`, {
        withCredentials: true,
      });

      console.log(response.data)

      setUserFollower(response.data);
    } catch (error) {
      console.error('Error checking if following:', error);
    }
  }

  // useEffect(() => {
  //   fetchUserDetails();
  //   fetchUserFollowing();
  // }, []);

  useEffect(() => {
    fetchUserDetails(); 
  }, []);

  const renderContent = () => {
    if (activeButton === 'message' && userFollowing.length > 0) {
      return (
        <div className="content">
          {userFollowing.map((user) => (
            <div>
            <img src={image} className="circleIcon" />
            <span>{user.username}</span>
            </div>
          ))}
        </div>
      );
    } else if (activeButton === 'bell' && userFollower.length > 0) {
      return (
        <div className="content">
          {userFollower.map((user) => (
            <div>
            <img src={image} className="circleIcon" />
            <span><Link to={`/user/profile/${user.username}`} className="user-link">{user.username}</Link> started following you</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rightSideNav">
      <button
        className={activeButton === 'message' ? 'active' : ''}
        onClick={() => setActiveButton('message')}
      >
        <i className="bx bxs-message-dots"></i>
      </button>
      <button
        className={activeButton === 'bell' ? 'active' : ''}
        onClick={() => setActiveButton('bell')}
      >
        <i className="bx bxs-bell"></i>
      </button>
      <button onClick={handleLogout}>
        <i className="bx bx-log-in"></i>
      </button>

      {renderContent()}
    </div>
  )
}

export default RightNav