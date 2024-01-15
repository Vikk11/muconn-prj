import React from 'react'
import {Link} from 'react-router-dom';
import userImage from "../assets/profile.png";

function SearchResults({ results, category }) {
  return (
    <div className = "recent-searches-container">
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <div className="recent-searches">
        <table>
          <thead>
            <tr className="searches-headers">
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr className="search-history">
              <td>
                {category === 'songs' && (
                  <div className="song-info">
                    <img src={result.album.coverImage}/>
                    <div className="song-details">
                      <Link to={`/album/${result.album.title}`}><div className="song-title">{result.title}</div></Link>
                    </div>
                  </div>
                )}
                {category === 'artists' && (
                  <div className="song-info">
                    <img src={result.image}/>
                    <div className="song-details">
                      <Link to={`/artist/${result.id}`}><div className="song-title">{result.name}</div></Link>
                    </div>
                  </div>
                )}
                {category === 'users' && (
                  <div className="song-info">
                    <img src={userImage}/>
                    <div className="song-details">
                      <Link to={`/user/profile/${result.username}`}><div className="song-title">{result.username}</div></Link>
                    </div>
                  </div>
                )}
                {category === 'playlists' && (
                  <div className="song-info">
                    <img src={result.image}/>
                    <div className="song-details">
                      <Link to={`/playlist/${result.id}`}><div className="song-title">{result.title}</div></Link>
                    </div>
                  </div>
                )}
                {category === 'albums' && (
                  <div className="song-info">
                    <img src={result.coverImage}/>
                    <div className="song-details">
                      <Link to={`/album/${result.title}`}><div className="song-title">{result.title}</div></Link>
                    </div>
                  </div>
                )}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div> 
  )
}

export default SearchResults