import React from 'react'
import "../styles/PlaylistPage.css";
import LeftNav from "../components/LeftNav";
import PlaylistImg from "../assets/top-hits.png";

function PlaylistPage() {
  return (
    <div>
        <LeftNav></LeftNav>
        <div className = "playlist-background">
            <div className="playlist-cover">
                <img src={PlaylistImg} />
                <h2>Today's Top Hits</h2>
            </div>  
        </div>
    </div>
  )
}

export default PlaylistPage