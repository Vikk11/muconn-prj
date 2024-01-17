import React, {useState, useEffect} from 'react';
import "../styles/PlaylistSong.css";
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AddSongPopup from '../components/AddSongPopup';
import axios from 'axios';

function LikedSongs() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const { loginSuccess } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const[songId, setSongId] = useState(null);
  const[userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const username = localStorage.getItem('loggedInUser');
  
      if (!username) {
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/api/users/user/details/${username}`, {
        withCredentials: true,
      });
  
      setUserDetails(response.data);
      await fetchSongs(response.data.id)
    } catch (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchSongs = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/songs/user/${userId}`); 
      const data = await response.json();

      setPlaylistSongs(data);
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
    <div >
      <table className={loginSuccess ? "loggedin-table" : null}>
        <thead>
          <tr className="playlist-headers">
            <th>#</th>
            <th>Title</th>
            <th>Album</th>
            <th></th>
            <th></th>
            <th><i class='bx bx-time'></i></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {userDetails && (
            <>
            {playlistSongs.map((song, index) => (
            <tr className="line-separator" key={song.id}>
              <td>{index + 1}</td>
              <td>
                <div className="song-info">
                  <img src={`http://localhost:8080/images/albums/${song.album.coverImage}`} />
                  <div className="song-details">
                    <div className="song-title">{song.title}</div>
                    <Link to={`/artist/${song.artist.id}`}><div className="song-artist">{song.artist.name}</div></Link>
                  </div>
                </div>
              </td>
              <td><Link to={`/album/${song.album.title}`}><div className="song-album">{song.album.title}</div></Link></td>
              <td></td>
              <td></td>
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
            </>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default LikedSongs