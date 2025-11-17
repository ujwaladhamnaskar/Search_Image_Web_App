import React from 'react';
import styles from '../styles/FiltersBar.module.css';

const trendingTags = ['nature', 'technology', 'people', 'travel', 'food', 'animals', 'architecture', 'business', 'sports'];

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


