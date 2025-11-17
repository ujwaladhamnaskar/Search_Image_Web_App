import React from 'react';
import styles from '../styles/ImageGrid.module.css';
import ImageCard from './ImageCard';

// ImageGrid shows many images in a simple grid layout.
// If there are no images, it tells the user to start searching.
function ImageGrid({ images, onSelect }) {
    if (!images || images.length === 0) {
        return <div className={styles.empty}>Start typing to search stunning images.</div>;
    }

    return (
        <div className={styles.grid}>
            {images.map((img) => (
                <ImageCard
                    key={img.id}
                    image={img}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}

export default React.memo(ImageGrid);


