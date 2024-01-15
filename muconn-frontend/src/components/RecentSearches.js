import React from 'react'
import "../styles/SearchPage.css"
import {Link} from 'react-router-dom';
import image from "../assets/top-hits.png";

function RecentSearches() {
  return (
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
  )
}

export default RecentSearches