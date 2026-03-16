export default function KPICard({ label, value, sub, color = '#3b82f6', delta }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
      border: '1px solid #1e293b',
      borderRadius: '12px',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
        borderRadius: '50%', opacity: 0.05, background: color,
        transform: 'translate(30%, -30%)',
      }} />
      <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{value}</div>
      {delta !== undefined && (
        <span style={{
          fontSize: '12px', fontWeight: 500, marginTop: '4px', display: 'inline-block',
          color: delta >= 0 ? '#34d399' : '#f87171',
        }}>
          {delta >= 0 ? '+' : ''}{delta}% YoY
        </span>
      )}
      {sub && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{sub}</div>}
    </div>
  );
}
