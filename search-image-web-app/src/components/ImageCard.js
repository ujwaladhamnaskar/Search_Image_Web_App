import React, { useRef, useState } from 'react';
import styles from '../styles/ImageCard.module.css';
import { FaHeart, FaEye } from 'react-icons/fa';

function ImageCard({ image, onSelect }) {
    const ref = useRef(null);
    const [loaded, setLoaded] = useState(false);
    if (!image) return null;

    const { webformatURL, tags, user, likes, views } = image;

    return (
        <button
            ref={ref}
            className={styles.card}
            onClick={() => {
                const rect = ref.current?.getBoundingClientRect();
                onSelect && onSelect(image, rect);
            }}
            aria-label={`Open image by ${user}`}
            title="Open details"
        >
            <img
                className={`${styles.media} ${loaded ? styles.loaded : ''}`}
                src={webformatURL}
                alt={tags}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
            />
            <div className={styles.overlay}>
                <div className={styles.metaTop}>{tags}</div>
                <div className={styles.metaBottom}>
                    <span className={styles.author}>{user}</span>
                    <span className={styles.stats}>
                        <FaHeart /> {likes}
                        <FaEye style={{ marginLeft: 12 }} /> {views}
                    </span>
                </div>
            </div>
        </button>
    );
}

export default React.memo(ImageCard);


