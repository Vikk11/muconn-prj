import React, {useState, useEffect} from 'react';
import image from "../assets/profile.png";
import "../styles/Chatroom.css";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Chatroom() {
  const { loginSuccess } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loggedUserDetails, setLoggedUserDetails] = useState(null);

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

  const fetchMessages = async () => {
    try {
        console.log(loggedUserDetails, userDetails)
        const user1Id = loggedUserDetails.id;
        const user2Id = userDetails.id;
      const response = await axios.get(`http://localhost:8080/api/messages/${user1Id}/allMessages/${user2Id}`,{
        withCredentials: true,
      });
      setMessages(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const messageDto = {
        sender: loggedUserDetails, 
        receiver: userDetails,
        message: newMessage
      };

      await axios.post('http://localhost:8080/api/messages/saveMessage', messageDto);

      await fetchMessages();
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchLoggedUserDetails();
  }, []);

  useEffect(() => {
    if(loggedUserDetails){
      fetchMessages();
    }
  }, [loggedUserDetails]);

  return (
    <div className="chatroom-container">
        <LeftNav></LeftNav>
        {userDetails && (
            <div className="header">
                <div className="user-info">
                    <img src={image} />
                    <Link to ={`/user/profile/${userDetails.username}`} className="info-username">{userDetails.username}</Link>
                </div>
            </div>
        )}
        <div className="messages-container">
            {messages.length === 0 ? (
            <div className="no-messages">No messages yet</div>
            ) : (
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className={message.sender.id === loggedUserDetails.id ? 'sent' : 'received'}>
                        {message.message}
                    </div>
                ))}
            </div>
             )}
        </div>
        <div className="message-input-container">
        <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}><i class='bx bxs-send'></i></button>
        </div>
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

export default Chatroom