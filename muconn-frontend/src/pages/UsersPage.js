import React, {useState, useEffect} from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import image from "../assets/profile.png";
import useAuth from '../hooks/useAuth';
import Playlists from "../components/UserPlaylists";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/ProfilePage.css"

function UsersPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);
  const { loginSuccess } = useAuth();
  const { username } = useParams();
  console.log(username);
  const [buttonState, setButtonState] = useState("Follow");

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/user/details/${username}`, {
        withCredentials: true,
      });
  
      setUserDetails(response.data);
      console.log(response.data.username);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  const fetchLoggedUserDetails = async () => {
    try {
      const loggedUsername = localStorage.getItem('loggedInUser');
  
      if (!loggedUsername) {
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/users/user/details/${loggedUsername}`, {
        withCredentials: true,
      });
  
      setLoggedUserDetails(response.data);
      console.log(response.data.username);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setLoggedUserDetails(null);
    }
  };

  const followUser = async () => {
    try {
      await fetchLoggedUserDetails();

      await axios.post('http://localhost:8080/api/followers/follow', {
        follower : { id: loggedUserDetails.id, username: loggedUserDetails.username, email: loggedUserDetails.email, password: loggedUserDetails.password }, 
        following : { id: userDetails.id, username: userDetails.username, email: userDetails.email, password: userDetails.password },
      });

      setButtonState("FollowingDisplayedUser");
    } catch (error) {
      console.error('Something went wrong:', error);
      setButtonState("Follow");
    }
  }

  const checkIfFollowing = async () => {
    // await fetchLoggedUserDetails();
    // if (!loggedUserDetails || !userDetails) {
    //   return;
    // }
    
    // const loggedInUserId = loggedUserDetails.id;
    // const displayedUserId = userDetails.id;
  
    try {
      console.log("hello")
      const loggedInUserId = loggedUserDetails.id;
      const displayedUserId = userDetails.id;

      console.log("Fetching logged user followers");
      const loggedInUserFollowingResponse = await axios.get(`http://localhost:8080/api/users/${loggedInUserId}/followings`, {
        withCredentials: true,
      });
  
      console.log("Fetching displayed user followers");
      const displayedUserFollowingResponse = await axios.get(`http://localhost:8080/api/users/${displayedUserId}/followings`, {
        withCredentials: true,
      });
  
      console.log("Logged User Followings Response:", loggedInUserFollowingResponse.data);
      console.log("Displayed User Followings Response:", displayedUserFollowingResponse.data);

      const loggedInUserFollowings = loggedInUserFollowingResponse.data;
      const displayedUserFollowings = displayedUserFollowingResponse.data;
  
      const isFollowingDisplayedUser = loggedInUserFollowings.some(following => following.username === userDetails.username);
      const isFollowingLoggedInUser = displayedUserFollowings.some(follower => follower.username === loggedUserDetails.username);
  
      if (isFollowingDisplayedUser && isFollowingLoggedInUser) {
        console.log("Following each other");
        setButtonState("FollowingEachOther"); 
      } else if (isFollowingDisplayedUser) {
        console.log("Following displayed user");
        setButtonState("FollowingDisplayedUser"); 
      } else if (isFollowingLoggedInUser) {
        console.log("Follow back");
        setButtonState("FollowBack"); 
      } else {
        console.log("Not following");
        setButtonState("Follow");
      }
    } catch (error) {
      console.error('Error checking if following:', error);
      setButtonState("Follow");
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchLoggedUserDetails();
  }, []);


  useEffect(() => {
    if(loggedUserDetails){
      checkIfFollowing();
    }
  }, [loggedUserDetails]);

  return (
    <div>
      <LeftNav></LeftNav>
      <div className="profile-container">
        {userDetails && (
        <>
          <img src={image} alt="User Profile"></img>
          <div>
            <h1>{userDetails.username}</h1>
          </div>
          {loginSuccess ? (
            <div>
              <button className="follow-btn" onClick={followUser} disabled={buttonState === "FollowingEachOther" || buttonState === "FollowingDisplayedUser"}>
                {buttonState === "FollowingEachOther" && 'Following'}
                {buttonState === "FollowingDisplayedUser" && 'Following'}
                {buttonState === "FollowBack" && 'Follow Back'}
                {buttonState === "Follow" && 'Follow'}
              </button>
            </div>
          ) : null}
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

export default UsersPage