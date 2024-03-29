import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Search from "./pages/SearchPage";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/PlaylistPage";
import Artist from "./pages/Artist";
import Albums from "./pages/AlbumsPage";
import Album from "./pages/Album";
import Profile from "./pages/ProfilePage";
import UserPlaylist from "./pages/UserPlaylistPage";
import UsersPage from "./pages/UsersPage";
import Chatroom from "./pages/Chatroom";
import LikedSongs from "./pages/LikedSongsPage";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/search" element = {<Search/>}/>
        <Route path="/playlists/:username" element = {<Playlists/>}/>
        <Route path="/playlist/:playlistId" element = {<Playlist/>}/>
        <Route path="/artist/:artistId" element = {<Artist/>}/>
        <Route path="/albums/:artistName" element = {<Albums/>}/>
        <Route path="/album/:albumTitle" element = {<Album/>}/>
        <Route path ="/profile" element = {<Profile/>}/>
        <Route path="/:username/playlist/:playlistId" element = {<UserPlaylist/>}/>
        <Route path="/user/profile/:username" element = {<UsersPage/>}/>
        <Route path="/chat/:username" element = {<Chatroom/>}/>
        <Route path="/likedSongs" element = {<LikedSongs/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
