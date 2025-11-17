import React, { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import zoomLogo from '../images/zoom.png';

function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={zoomLogo} alt="Explorer logo" className={styles.logoImage} />
          <span className={styles.title}>Image Explorer</span>
        </div>
        <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
          <span className={styles.themeText}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;


