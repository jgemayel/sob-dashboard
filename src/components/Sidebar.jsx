import { BANK_COLORS } from '../data/bankData';

const tabs = [
  { id: 'executive',     icon: '\u2B21', label: 'Executive' },
  { id: 'hypotheses',    icon: '\u25C8', label: 'Hypotheses' },
  { id: 'financial',     icon: '\u25A4', label: 'Financial' },
  { id: 'ratios',        icon: '\u25CE', label: 'Ratios' },
  { id: 'deepdive',      icon: '\u25C9', label: 'Deep Dive' },
  { id: 'benchmarking',  icon: '\u229E', label: 'Benchmarks' },
  { id: 'branches',      icon: '\u22A1', label: 'Branches' },
  { id: 'concentration', icon: '\u25EC', label: 'Concentration' },
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
      {/* Animated gradient edge line */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '2px',
        height: '100%',
        background: 'linear-gradient(180deg, transparent 0%, #3b82f620 10%, #3b82f650 20%, transparent 30%, transparent 40%, #10b98130 50%, transparent 60%, transparent 70%, #8b5cf640 80%, transparent 90%, transparent 100%)',
        backgroundSize: '100% 200%',
        animation: 'sidebarGlow 8s linear infinite',
        zIndex: 1,
      }} />

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
                background: isActive ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                color: isActive ? '#fff' : '#94a3b8',
                border: 'none',
                borderLeft: isActive
                  ? '3px solid #3b82f6'
                  : '3px solid transparent',
                boxShadow: isActive
                  ? 'inset 0 0 20px rgba(59, 130, 246, 0.06), -2px 0 10px rgba(59, 130, 246, 0.1)'
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.paddingLeft = '22px';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.paddingLeft = '20px';
                }
              }}
            >
              <span style={{ fontSize: '15px', width: '20px', textAlign: 'center', opacity: isActive ? 1 : 0.5, transition: 'opacity 0.2s' }}>{t.icon}</span>
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
