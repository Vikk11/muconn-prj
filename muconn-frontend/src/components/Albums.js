import React, { useState, useEffect } from 'react'
import topHits from "../assets/top-hits.png"
import {Link} from 'react-router-dom';
import "../styles/Home.css";
import "../styles/Album.css";

function Albums({artistName}) {
  const [artistAlbums, setArtistAlbums] = useState([]);
  console.log(artistName);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/albums/artist/${artistName}`); 
      const data = await response.json();

      setArtistAlbums(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  return (
    <div>
      <section className="album-section">
        <div className="section-title">
          <h1>Albums</h1>
          <Link to={`/albums/${artistName}`} className="small-link">
            See more
          </Link>
        </div>
        <div className="container-section">
        {artistAlbums.map((album) => (
            <Link to={`/album/${album.title}`} className="box">
            <img src={`http://localhost:8080/images/albums/${album.coverImage}`} className="box-img"/>
            <div className="box-text">
              <h2>{album.title}</h2>
            </div>
            </Link>
        ))}
        </div>
      </section>
    </div>
  )
}

export default Albums