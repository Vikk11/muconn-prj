import React from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import topHits from "../assets/top-hits.png"
import "../styles/Home.css"
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
      <LeftNav></LeftNav>
      <Link to="/login" className="login-btn">Log in</Link>
      <section>
          <div className="section-title">
              <h1>Muconn Playlists</h1>
          </div>
        <div className="container-section">
            <a href="/playlist" className="box">
              <img src={topHits} className="box-img"/>
              <div className = "box-text">
                <h2>Today's Top Hits</h2>
                <p>Top 50 Songs of the Day</p>
              </div>
            </a>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
        </div>
      </section>
      <p className="preview-text">Sign up to get access to all features.</p>
      {/* <RightNav></RightNav> */}
    </div>
  )
}

export default Home