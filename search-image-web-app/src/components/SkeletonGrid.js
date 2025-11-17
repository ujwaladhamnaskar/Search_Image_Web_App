import React from 'react';
import styles from '../styles/SkeletonGrid.module.css';

function SkeletonGrid({ count = 12 }) {
  const items = Array.from({ length: count });
  return (
    <div className={styles.grid}>
      {items.map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.shimmer} />
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;


