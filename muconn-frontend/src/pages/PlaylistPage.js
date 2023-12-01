import React, { useState } from 'react'
import "../styles/PlaylistPage.css";
import LeftNav from "../components/LeftNav";
import PlaylistImg from "../assets/top-hits.png";
import PlaylistSong from "../components/PlaylistSong";

function PlaylistPage() {
  const [leftNavVisible, setLeftNavVisible] = useState(false);
  return (
    <div>
      <button className="mobile-nav-toggle" onClick={() => setLeftNavVisible(!leftNavVisible)}>
        <i className='bx bx-menu'></i>
      </button>
        <LeftNav visible={leftNavVisible} onClose={() => setLeftNavVisible(false)}></LeftNav>
        <div className = "playlist-background">
            <div className="playlist-cover">
                <img src={PlaylistImg} />
                <h2>Today's Top Hits</h2>
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
          <PlaylistSong></PlaylistSong>
        </div>
    </div>
  )
}

export default PlaylistPage