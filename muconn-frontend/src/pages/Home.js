import React, { useState, useEffect }from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import topHits from "../assets/top-hits.png"
import "../styles/Home.css"
import {Link} from 'react-router-dom';

function Home() {
  const [leftNavVisible, setLeftNavVisible] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  const fetchUserPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/playlists/user/5'); 
      const data = await response.json();

      setUserPlaylists(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

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
          {userPlaylists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} className="box" key={playlist.id}>
              <img src={`http://localhost:8080/images/playlists/${playlist.image}`} className="box-img"/>
              <div className="box-text">
                <h2>{playlist.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <p className="preview-text">Sign up to get access to all features.</p>
      {/* <RightNav></RightNav> */}
    </div>
  )
}

export default Home