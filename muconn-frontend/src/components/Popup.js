import React from 'react'
import "../styles/Popup.css";

const Popup = ({ isOpen, onClose}) => {
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
        <div className="popup-confirmation">
        <button className="close-button" onClick={onClose}>x</button>
        <h1 className="confirmation-message">Thanks for signing up! You can now log in.</h1>
      </div>
    </div>
  )
}

export default Popup