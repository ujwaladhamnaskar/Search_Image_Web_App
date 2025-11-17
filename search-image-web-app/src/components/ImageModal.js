import React, { useEffect } from 'react';
import styles from '../styles/ImageModal.module.css';
import { FaTimes, FaDownload, FaExternalLinkAlt, FaUser, FaHeart, FaEye, FaShareAlt } from 'react-icons/fa';

function ImageModal({ image, onClose }) {
    useEffect(() => {
        if (!image) return;
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose && onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [image, onClose]);

    if (!image) return null;

    const {
        largeImageURL,
        webformatURL,
        tags,
        user,
        userImageURL,
        pageURL,
        likes,
        views,
        imageWidth,
        imageHeight
    } = image;

    const downloadUrl = largeImageURL || webformatURL;

    return (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    <FaTimes />
                </button>
                <div className={styles.mediaWrap}>
                    <img className={styles.media} src={downloadUrl} alt={tags} />
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>{tags}</div>
                    <div className={styles.submeta}>
                        <span className={styles.metaItem}>
                            {userImageURL ? <img className={styles.avatar} src={userImageURL} alt={user} /> : <FaUser />}
                            {user}
                        </span>
                        <span className={styles.metaItem}><FaHeart /> {likes}</span>
                        <span className={styles.metaItem}><FaEye /> {views}</span>
                        <span className={styles.metaItem}>{imageWidth}×{imageHeight}</span>
                    </div>
                    <div className={styles.tags}>
                        {String(tags || '').split(',').slice(0, 8).map((t, i) => (
                            <span key={i} className={styles.tag}>#{t.trim()}</span>
                        ))}
                    </div>
                    <div className={styles.actions}>
                        <a
                            className={styles.primaryBtn}
                            href={downloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaDownload /> Download
                        </a>
                        <a
                            className={styles.secondaryBtn}
                            href={pageURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaExternalLinkAlt /> View on Pixabay
                        </a>
                        <button
                            className={styles.secondaryBtn}
                            onClick={() => {
                                const shareData = { title: 'Image from Pixabay', text: tags, url: pageURL || downloadUrl };
                                if (navigator.share) {
                                    navigator.share(shareData);
                                } else {
                                    navigator.clipboard?.writeText(shareData.url);
                                    alert('Link copied to clipboard');
                                }
                            }}
                        >
                            <FaShareAlt /> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageModal;


