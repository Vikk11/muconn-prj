import React from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/SearchPage.css"
import {Link} from 'react-router-dom';
import image from "../assets/top-hits.png";
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <div>
      <LeftNav></LeftNav>
      <div className="search-buttons-container">
          <input type="text" className="search-box" placeholder="Search..."/>
          <button><i class='bx bx-search' ></i></button>
      </div> 
      <div className ="option-buttons">
        <button>Song</button>
        <button>Artist</button>
        <button>User</button>
        <button>Playlist</button>
        <button>Album</button>
      </div>
      <div className = "recent-searches-container">
        <h2>Recent searches</h2>
        <div className="recent-searches">
            <table>
            <thead>
              <tr className="searches-headers">
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="search-history">
                <td>
                  <div className="song-info">
                    <img src={image} />
                      <div className="song-details">
                        <div className="song-title">Song Title</div>
                        <Link to="/artist"><div className="song-artist">Song</div></Link>
                      </div>
                    </div>
                  </td>
                  <td><button className="delete-search-btn">&#10005;</button></td>
              </tr>
              <tr className="search-history">
                <td>
                  <div className="song-info">
                    <img src={image} />
                      <div className="song-details">
                        <div className="song-title">Album Title</div>
                        <Link to="/artist"><div className="song-artist">Album</div></Link>
                      </div>
                    </div>
                  </td>
                  <td><button className="delete-search-btn">&#10005;</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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

export default SearchPage