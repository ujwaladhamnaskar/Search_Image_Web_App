import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageGrid from './ImageGrid';
import SkeletonGrid from './SkeletonGrid';
import ImageModal from './ImageModal';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// keeps track of loading, errors, pages, and which image is currently opened.
// It passes the loaded images into the grid and shows a modal when the user selects one.
function ImagesContainer({ searchQuery }) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isFetchingRef = useRef(false);
    const abortRef = useRef(null);
    const currentQueryRef = useRef('');
    const [isLoadMoreHover, setIsLoadMoreHover] = useState(false);
    const IMAGES_PER_PAGE = 30;

    const buildUrl = useCallback((q) => {
        const base = API_BASE_URL.replace(/\/$/, '');
        return `${base}/api/images?q=${encodeURIComponent(q || '')}`;
    }, []);

    const fetchPage = useCallback(async (page, replace) => {
        if (!searchQuery) {
            setImages([]);
            setError(null);
            setTotalPages(1);
            setCurrentPage(1);
            return;
        }
        
        if (replace && abortRef.current) {
            try { abortRef.current.abort(); } catch (_) {}
            abortRef.current = null;
            isFetchingRef.current = false;
        }
        
        if (!replace && isFetchingRef.current) return;
        isFetchingRef.current = true;
        setError(null);
        if (replace) {
            setIsInitialLoading(true);
        } else {
            setIsLoadingMore(true);
        }
        try {
            const controller = new AbortController();
            abortRef.current = controller;
            const url = `${buildUrl(searchQuery)}&page=${page}&per_page=${IMAGES_PER_PAGE}`;
            const res = await axios.get(url, { signal: controller.signal });
            if (controller.signal.aborted) return;
            if (currentQueryRef.current !== searchQuery) return;
            const hits = res.data?.hits || [];
            const total = res.data?.totalPages || 1;
            setTotalPages(total);
            setCurrentPage(page);
            setImages((prev) => {
                const base = replace ? [] : prev;
                const merged = [...base, ...hits];
                const seen = new Set();
                const unique = [];
                for (const img of merged) {
                    const id = img?.id;
                    if (id == null || !seen.has(id)) {
                        if (id != null) seen.add(id);
                        unique.push(img);
                    }
                }
                return unique;
            });
        } catch (err) {
            if (err?.name !== 'CanceledError' && err?.name !== 'AbortError') {
                setError('Failed to load images. Please try again.');
            }
        } finally {
            isFetchingRef.current = false;
            setIsInitialLoading(false);
            setIsLoadingMore(false);
        }
    }, [buildUrl, searchQuery]);

    useEffect(() => {
        if (!searchQuery) {
            if (abortRef.current) {
                try { abortRef.current.abort(); } catch (_) {}
                abortRef.current = null;
            }
            setImages([]);
            setError(null);
            setCurrentPage(1);
            setTotalPages(1);
            return;
        }
        currentQueryRef.current = searchQuery;
        setImages([]);
        setError(null);
        setCurrentPage(1);
        setTotalPages(1);
        fetchPage(1, true);
    }, [searchQuery, fetchPage]);

    return (
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
            {error && <div style={{ padding: 24, textAlign: 'center', color: '#ef4444' }}>{error}</div>}
            {images.length === 0 && isInitialLoading && <SkeletonGrid count={12} />}
            {images.length > 0 && (
                <ImageGrid
                    images={images}
                    onSelect={(img) => {
                        setSelectedImage(img);
                    }}
                />
            )}
            {images.length > 0 && currentPage < totalPages && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 24px 0' }}>
                    <button
                        onClick={() => fetchPage(currentPage + 1, false)}
                        disabled={isLoadingMore}
                        onMouseEnter={() => setIsLoadMoreHover(true)}
                        onMouseLeave={() => setIsLoadMoreHover(false)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            border: '1px solid transparent',
                            background: isLoadMoreHover ? '#1D4ED8' : '#2563EB',
                            color: '#fff',
                            cursor: isLoadingMore ? 'default' : 'pointer',
                            minWidth: 140,
                            transition: 'background-color 150ms ease'
                        }}
                    >
                        {isLoadingMore ? 'Loading…' : 'Load More'}
                    </button>
                </div>
            )}
            <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
}

export default ImagesContainer;