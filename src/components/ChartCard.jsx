export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={className} style={{
      background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
      border: '1px solid #1e293b',
      borderRadius: '12px',
      padding: '20px',
    }}>
      {title && (
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
