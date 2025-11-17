import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/serachBar.css';

// SearchBar is the text box where the user types what they want to find.
// It keeps that text in local state and only tells the parent when the form is submitted.
// This means the rest of the app updates only when the user actually starts a search.
function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSearch) return;
    onSearch(inputValue.trim());
  };

  return (
    <div className="search-wrapper">
      <form className="search-container" onSubmit={handleSubmit}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search and discover high-quality images..."
          value={inputValue}
          onChange={handleSearchInput}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;