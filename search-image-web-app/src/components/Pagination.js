import React from 'react';

function Pagination({ currentPage, totalPages, isLoading, onPrev, onNext, onPage }) {
  const canPrev = currentPage > 1 && !isLoading;
  const canNext = currentPage < totalPages && !isLoading;

  // Minimal numeric pages: first, prev, current, next, last
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('…');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', padding: '12px 0 24px 0' }}>
      <button
        onClick={onPrev}
        disabled={!canPrev}
        style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: canPrev ? 'pointer' : 'default' }}
      >
        Prev
      </button>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {pages.map((p, idx) => {
          if (p === '…') {
            return <span key={`e-${idx}`} style={{ color: 'var(--muted)' }}>…</span>;
          }
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPage && onPage(p)}
              disabled={isActive || isLoading}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: isActive ? 'var(--primary)' : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text)',
                cursor: isActive || isLoading ? 'default' : 'pointer'
              }}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!canNext}
        style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: canNext ? 'pointer' : 'default' }}
      >
        Next
      </button>
      <span style={{ marginLeft: 10, color: 'var(--muted)' }}>
        Page {currentPage} of {totalPages} {isLoading ? '· Loading…' : ''}
      </span>
    </div>
  );
}

export default Pagination;


