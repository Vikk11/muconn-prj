import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/PlaylistPage.css";
import LeftNav from "../components/LeftNav";
import PlaylistImg from "../assets/top-hits.png";
import PlaylistSong from "../components/PlaylistSong";

function PlaylistPage() {
  const [leftNavVisible, setLeftNavVisible] = useState(false);
  const { playlistId } = useParams();
  console.log('Playlist ID:', playlistId);
  const [playlistDetails, setPlaylistDetails] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/playlists/user/5/playlist/${playlistId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPlaylistDetails(data);
      } catch (error) {
        console.error('Error fetching playlist details:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  if (playlistDetails === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button className="mobile-nav-toggle" onClick={() => setLeftNavVisible(!leftNavVisible)}>
        <i className='bx bx-menu'></i>
      </button>
        <LeftNav visible={leftNavVisible} onClose={() => setLeftNavVisible(false)}></LeftNav>
        <div className = "playlist-background">
            <div className="playlist-cover">
                <img src={`http://localhost:8080/images/playlists/${playlistDetails.image}`} />
                <h2>{playlistDetails.title}</h2>
            </div>  
        </div>
        <div className="playlist-buttons-container">
          <button><i class='bx bx-play'></i></button>
          <button><i class='bx bx-shuffle' ></i></button>
          <button><i class='bx bx-sort-alt-2' ></i></button>
          <input type="text" class="wide-text-box" placeholder="Search in playlist"/>
          <button><i class='bx bx-search' ></i></button>
        </div> 
        <div className="playlist-songs-container">
          <PlaylistSong playlistId={playlistDetails.id}></PlaylistSong>
        </div>
    </div>
  )
}

export default PlaylistPage