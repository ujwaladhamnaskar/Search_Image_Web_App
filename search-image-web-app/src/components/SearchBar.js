import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/serachBar.css';

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