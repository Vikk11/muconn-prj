import React, {useState, useEffect} from 'react'
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import "../styles/SearchPage.css"
import {Link} from 'react-router-dom';
import image from "../assets/top-hits.png";
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom';
import RecentSearches from "../components/RecentSearches";
import SearchResults from "../components/SearchResults";

function SearchPage() {
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedButton, setSelectedButton] = useState('all')
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchResults(selectedButton);
  }, [searchQuery, selectedButton]);

  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    fetchResults(category);
  };

  const fetchResults = async (category) => {
    try {
      let data;
  
      if (searchQuery && selectedButton !== 'all') {
        let response;
  
        switch (selectedButton) {
          case 'songs':
            response = await fetch(`http://localhost:8080/api/songs/search/song?query=${searchQuery}`);
            break;
          case 'artists':
            response = await fetch(`http://localhost:8080/api/artists/search/artist?query=${searchQuery}`);
            break;
          case 'users':
            response = await fetch(`http://localhost:8080/api/users/search/user?query=${searchQuery}`);
            break;
          case 'playlists':
            response = await fetch(`http://localhost:8080/api/playlists/search/playlist?query=${searchQuery}`);
            break;
          case 'albums':
            response = await fetch(`http://localhost:8080/api/albums/search/album?query=${searchQuery}`);
            break;
          default:
            break;
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        data = await response.json();
        setSearchResults(data?.results || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const renderResults = () => {
    if (searchQuery && selectedButton !== 'all') {
      return <SearchResults results={searchResults} category={selectedButton} />;
    } else {
      return <RecentSearches />;
    }
  };

  return (
    <div>
      <LeftNav></LeftNav>
      <div className="search-buttons-container">
          <input type="text" className="search-box" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <button><i class='bx bx-search' ></i></button>
      </div> 
      <div className ="option-buttons">
        <button className={selectedButton === 'all' ? 'active' : ''} onClick={() => handleButtonClick('all')}>All</button>
        <button className={selectedButton === 'songs' ? 'active' : ''} onClick={() => handleButtonClick('songs')}>Songs</button>
        <button className={selectedButton === 'artists' ? 'active' : ''} onClick={() => handleButtonClick('artists')}>Artists</button>
        <button className={selectedButton === 'users' ? 'active' : ''} onClick={() => handleButtonClick('users')}>Users</button>
        <button className={selectedButton === 'playlists' ? 'active' : ''} onClick={() => handleButtonClick('playlists')}>Playlists</button>
        <button className={selectedButton === 'albums' ? 'active' : ''} onClick={() => handleButtonClick('albums')}>Albums</button>
      </div>
      {renderResults()}
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