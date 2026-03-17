import { useEffect, useRef } from 'react';

export default function DrillDown({ isOpen, onClose, title, subtitle, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'overlayFadeIn 0.25s ease-out',
      }}
    >
      <div
        ref={panelRef}
        style={{
          width: '90%',
          maxWidth: '1000px',
          maxHeight: '85vh',
          overflowY: 'auto',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '32px',
          position: 'relative',
          animation: 'slideUp 0.35s ease-out',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.05)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          &times;
        </button>

        {/* Title */}
        <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ animation: 'fadeIn 0.4s ease-out 0.15s both' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
