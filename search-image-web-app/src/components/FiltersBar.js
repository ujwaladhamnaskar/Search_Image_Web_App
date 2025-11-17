import React from 'react';
import styles from '../styles/FiltersBar.module.css';

const trendingTags = ['nature', 'technology', 'people', 'travel', 'food', 'animals', 'architecture', 'business', 'sports'];

// FiltersBar is the strip of quick “trending” tags shown under the search bar.
// It gives users ideas and helps them explore without having to type everything from scratch.
function FiltersBar({ onQuickTag }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.trending} aria-label="Trending tags">
        {trendingTags.map(tag => (
          <button key={tag} className={styles.pill} onClick={() => onQuickTag && onQuickTag(tag)}>
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FiltersBar;


