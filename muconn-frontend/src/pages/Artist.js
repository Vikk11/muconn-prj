import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/Artist.css";
import Albums from "../components/Albums";
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';

function Artist() {
  const { artistId } = useParams();
  console.log('Artist ID:', artistId);
  const [artistDetails, setArtistDetails] = useState(null);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/artists/${artistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setArtistDetails(data);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  if (artistDetails === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <LeftNav></LeftNav>
        <div className="artist-container">\
          <img src={`http://localhost:8080/images/artists/${artistDetails.image}`}></img>
          <h1>{artistDetails.name}</h1>
        </div>
        <Albums artistName={artistDetails.name}></Albums>
        {loginSuccess ? (
         <>
          <RightNav />
          <button className="profile-btn" onClick={handleProfileButtonClick}><i class='bx bxs-user'></i></button>
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default Artist