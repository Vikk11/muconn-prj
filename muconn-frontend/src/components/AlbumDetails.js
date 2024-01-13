import React, { useState, useEffect } from 'react'
import "../styles/Album.css";
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import AddSongPopup from '../components/AddSongPopup';

function AlbumDetails({albumTitle}) {
  const [albumSongs, setAlbumSongs] = useState([]);
  const { loginSuccess } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const[songId, setSongId] = useState(null)

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/songs/album/${albumTitle}`);
      const data = await response.json();

      setAlbumSongs(data);
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  };

  const openAddSongPopup = (songId) => {
    setSongId(songId);
    setShowPopup(true);
  };

  const closeAddSongPopup = () => {
    setSongId(null);
    setShowPopup(false);
  };

  return (
    <div>
      <table className={loginSuccess ? "loggedin-table" : null}>
      <thead>
      <tr className="playlist-headers">
        <th>#</th>
        <th>Title</th>
        <th></th>
        <th><i class='bx bx-time'></i></th>
        <th></th>
      </tr>
      </thead>
      <tbody className="album-body">
          {albumSongs.map((song, index) => (
            <tr className="line-separator" key={song.id}>
              <td>{index + 1}</td>
              <td>
                <div className="song-info">
                  <div className="song-details">
                    <div className="song-title">{song.title}</div>
                    <Link to={`/artist/${song.artist.id}`}><div className="song-artist">{song.artist.name}</div></Link>
                  </div>
                </div>
              </td>
              {loginSuccess ? (
              <>
                <td className="heart"><i class='bx bx-heart'></i></td>
              </>
              ) : (
                <td></td>
              )}
              <td>{song.duration}</td>
              {loginSuccess ? (
              <>
                <td className="options"><button className="options-btn" onClick={() => openAddSongPopup(song.id)}><i class='bx bx-dots-vertical-rounded'></i></button></td>
                <AddSongPopup isOpen={showPopup} onClose={closeAddSongPopup} songId={songId}></AddSongPopup>
              </>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  )
}

export default AlbumDetails