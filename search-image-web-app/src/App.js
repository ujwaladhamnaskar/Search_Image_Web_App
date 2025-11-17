import './styles/App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ImagesContainer from './components/ImagesContainer';
import FiltersBar from './components/FiltersBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Header />
      <main>
        <section className="hero">
          <h1 className="heroTitle">
            Discover Images Instantly With {' '} <br /> Intelligent {' '}
            <span className="heroTitleAccent">Search</span>
          </h1>
          <p className="heroSubtitle">Use smart search to explore millions of images with ease</p>
          <SearchBar onSearch={setSearchQuery} />
          <FiltersBar onQuickTag={setSearchQuery} />
        </section>
        <section>
          <ImagesContainer searchQuery={searchQuery} />
        </section>
      </main>
    </div>
  );
}

export default App;
