import React, { useEffect, useMemo, useState } from 'react';
import styles from '../styles/ImageDetailOverlay.module.css';
import { FaTimes, FaDownload, FaExternalLinkAlt, FaUser, FaHeart, FaEye } from 'react-icons/fa';


// ImageDetailOverlay shows the big image with its author, stats, and quick actions, and can be closed again.
function ImageDetailOverlay({ image, originRect, containerRect, onClose }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!image) return;
    const id = requestAnimationFrame(() => setExpanded(true));
    return () => cancelAnimationFrame(id);
  }, [image]);

  const hasAllRects = !!(image && originRect && containerRect);

  const initialTransform = useMemo(() => {
    if (!hasAllRects) return 'none';
    const scaleX = originRect.width / containerRect.width;
    const scaleY = originRect.height / containerRect.height;
    const translateX = originRect.left - containerRect.left;
    const translateY = originRect.top - containerRect.top;
    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  }, [hasAllRects, originRect, containerRect]);

  if (!hasAllRects) return null;

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

  const handleClose = () => {
    setExpanded(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  return (
    <div className={styles.root} style={{ width: containerRect.width, height: containerRect.height }}>
      <div className={`${styles.backdrop} ${expanded ? styles.visible : ''}`} onClick={handleClose} />
      <div
        className={`${styles.animator} ${expanded ? styles.expanded : ''}`}
        style={{ transform: expanded ? 'none' : initialTransform }}
      >
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close"><FaTimes /></button>
        <div className={styles.content}>
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
            <div className={styles.actions}>
              <a className={styles.primaryBtn} href={downloadUrl} download target="_blank" rel="noopener noreferrer">
                <span><FaDownload /> Download</span>
              </a>
              <a className={styles.secondaryBtn} href={pageURL} target="_blank" rel="noopener noreferrer">
                <span><FaExternalLinkAlt /> View on Pixabay</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetailOverlay;


