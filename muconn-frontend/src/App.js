import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/PlaylistPage";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/search" element = {<Search/>}/>
        <Route path="/playlists" element = {<Playlists/>}/>
        <Route path="/playlist" element = {<Playlist/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
