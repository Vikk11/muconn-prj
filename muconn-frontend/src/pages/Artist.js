import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import topHits from "../assets/top-hits.png"
import "../styles/Artist.css";
import Albums from "../components/Albums";
import axios from 'axios';

function Artist() {
  const { artistId } = useParams();
  console.log('Artist ID:', artistId);
  const [artistDetails, setArtistDetails] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

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
    checkLoggedIn();
  }, [artistId]);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/check-auth', { withCredentials: true });
  
      if (response.status === 200) {
        setLoginSuccess(true);
      } else {
        await refreshAccessToken();
      }
    } catch (error) {
      setLoginSuccess(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        setLoginSuccess(false);
        return;
      }

      const response = await axios.post('http://localhost:8080/api/users/refresh-token', { refreshToken: refreshToken}, { withCredentials: true });
  
      if (response.status === 200) {
        setLoginSuccess(true);
      } else {
        setLoginSuccess(false);
      }
    } catch (error) {
      setLoginSuccess(false);
    }
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
          <button className="profile-btn"><i class='bx bxs-user'></i></button>
         </>
        ) : (
          null
        )}
    </div>
  )
}

export default Artist