import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/AlbumsPage.css"
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function AlbumsPage() {
  const { artistName } = useParams();
  console.log('Artist Name:', artistName);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

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

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <div>
      <LeftNav></LeftNav>
      <div>
        <h1 className="artist-name">{artistName}</h1>
        <section className={loginSuccess ? "loggedin-section" : "album-section"}>
        <div className="section-title">
        </div>
        <div className={loginSuccess ? "loggedin-albums-container-section" : "albums-container-section"}>
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

export default AlbumsPage