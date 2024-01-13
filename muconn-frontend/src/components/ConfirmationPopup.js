import React, {useEffect} from 'react'
import "../styles/Popup.css"

const ConfirmationPopup = ({isOpen, onClose}) => {
    useEffect(() => {
        if (isOpen) {
          const timeout = setTimeout(() => {
            onClose();
          }, 3000);
          return () => clearTimeout(timeout);
        }
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;
  return (
    <div className ="confirmation-popup">Song added to playlist</div>
  )
}

export default ConfirmationPopup