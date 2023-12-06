import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import topHits from "../assets/top-hits.png"
import "../styles/Artist.css";
import Albums from "../components/Albums";

function Artist() {
  const { artistId } = useParams();
  console.log('Artist ID:', artistId);
  const [artistDetails, setArtistDetails] = useState(null);

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
    </div>
  )
}

export default Artist