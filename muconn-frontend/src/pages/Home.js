import React, { useState }from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import topHits from "../assets/top-hits.png"
import "../styles/Home.css"
import {Link} from 'react-router-dom';

function Home() {
  const [leftNavVisible, setLeftNavVisible] = useState(false);

  return (
    <div>
      <button className="mobile-nav-toggle" onClick={() => setLeftNavVisible(!leftNavVisible)}>
        <i className='bx bx-menu'></i>
      </button>
      <LeftNav visible={leftNavVisible} onClose={() => setLeftNavVisible(false)}/>
      <Link to="/login" className="login-btn">Log in</Link>
      <section>
          <div className="section-title">
              <h1>Muconn Playlists</h1>
          </div>
        <div className="container-section">
            <Link to="/playlist" className="box">
              <img src={topHits} className="box-img"/>
              <div className = "box-text">
                <h2>Today's Top Hits</h2>
              </div>
            </Link>
            <Link to="/playlist" className="box">
              <img src={topHits} className="box-img"/>
              <div className = "box-text">
                <h2>Today's Top Hits</h2>
              </div>
            </Link>
            <Link to="/playlist" className="box">
              <img src={topHits} className="box-img"/>
              <div className = "box-text">
                <h2>Today's Top Hits</h2>
              </div>
            </Link>
            <Link to="/playlist" className="box">
              <img src={topHits} className="box-img"/>
              <div className = "box-text">
                <h2>Today's Top Hits</h2>
              </div>
            </Link>
        </div>
      </section>
      <p className="preview-text">Sign up to get access to all features.</p>
      {/* <RightNav></RightNav> */}
    </div>
  )
}

export default Home