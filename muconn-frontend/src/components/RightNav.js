import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Navigation.css";

function RightNav() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');  
    navigate('/'); 
  };
  return (
    <div className="rightSideNav">
      <button><i class='bx bxs-message-dots'></i></button>
      <button><i class='bx bxs-bell' ></i></button>
      <button onClick={handleLogout}><i class='bx bx-log-in' ></i></button>
    </div>
  )
}

export default RightNav