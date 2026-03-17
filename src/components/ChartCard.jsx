export default function ChartCard({ title, subtitle, children, className = '', onClick, expandable }) {
  const isClickable = onClick || expandable;

  return (
    <div
      className={`glass-card ${className}`}
      onClick={onClick}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        cursor: isClickable ? 'pointer' : 'default',
        animation: 'fadeIn 0.5s ease-out both',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
      }}
    >
      {/* Expand icon */}
      {expandable && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          background: 'rgba(59, 130, 246, 0.1)',
          color: '#3b82f6',
          fontSize: '12px',
          opacity: 0.5,
          transition: 'opacity 0.2s',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 1h4v4M5 11H1V7M11 1L7 5M1 11l4-4" />
          </svg>
        </div>
      )}

      {title && (
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{title}</h3>
          {subtitle && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{subtitle}</p>
              {isClickable && (
                <span style={{ fontSize: '10px', color: '#3b82f680', fontStyle: 'italic' }}>
                  click to explore
                </span>
              )}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
