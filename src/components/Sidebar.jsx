import { BANK_COLORS } from '../data/bankData';

const tabs = [
  { id: 'executive',     icon: '⬡', label: 'Executive' },
  { id: 'financial',     icon: '▤', label: 'Financial' },
  { id: 'ratios',        icon: '◎', label: 'Ratios' },
  { id: 'deepdive',      icon: '◉', label: 'Deep Dive' },
  { id: 'benchmarking',  icon: '⊞', label: 'Benchmarks' },
  { id: 'branches',      icon: '⊡', label: 'Branches' },
  { id: 'concentration', icon: '◬', label: 'Concentration' },
];

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, height: '100vh', width: '240px',
      display: 'flex', flexDirection: 'column', zIndex: 50,
      background: 'linear-gradient(180deg, #0c1220 0%, #0a0e17 100%)',
      borderRight: '1px solid #1e293b',
      overflow: 'hidden',
    }}>
      {/* Logo / Title */}
      <div style={{ padding: '20px', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase' }}>Syria</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>SOB Diagnostics</div>
        <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px' }}>State-Owned Banks &middot; 2022-2024</div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: '8px', paddingBottom: '8px', overflowY: 'auto' }}>
        {tabs.map(t => {
          const isActive = activeTab === t.id;
          return (
            <button key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 20px',
                display: 'flex', alignItems: 'center', gap: '12px',
                fontSize: '13px', fontWeight: isActive ? 600 : 500, cursor: 'pointer',
                background: isActive ? '#1e293b' : 'transparent',
                color: isActive ? '#fff' : '#94a3b8',
                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                border: 'none', borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { if (!isActive) { e.target.style.background = '#111827'; e.target.style.color = '#fff'; }}}
              onMouseLeave={(e) => { if (!isActive) { e.target.style.background = 'transparent'; e.target.style.color = '#94a3b8'; }}}
            >
              <span style={{ fontSize: '15px', width: '20px', textAlign: 'center', opacity: 0.7 }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bank Color Legend */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b' }}>
        <div style={{ fontSize: '10px', color: '#475569', marginBottom: '8px', fontWeight: 600 }}>BANK COLORS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {Object.entries(BANK_COLORS).map(([k, c]) => (
            <span key={k} style={{
              fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
              background: c + '22', color: c,
            }}>{k}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}
