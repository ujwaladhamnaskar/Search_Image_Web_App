import React from 'react';
import styles from '../styles/SkeletonGrid.module.css';

// SkeletonGrid is a placeholder of the image grid that shows grey “cards” while data loads.
// Once real images arrive, this skeleton disappears and the actual ImageGrid takes its place.
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


