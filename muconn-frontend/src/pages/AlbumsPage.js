import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import "../styles/AlbumsPage.css"
import {Link} from 'react-router-dom';
import topHits from "../assets/top-hits.png"

function AlbumsPage() {
  const { artistName } = useParams();
  console.log('Artist Name:', artistName);
  const [artistAlbums, setArtistAlbums] = useState([]);

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
      <LeftNav></LeftNav>
      <div>
        <h1 className="artist-name">{artistName}</h1>
        <section className="album-section">
        <div className="section-title">
        </div>
        <div className="albums-container-section">
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
    </div>
  )
}

export default AlbumsPage