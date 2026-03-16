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
    <aside className="fixed left-0 top-0 h-screen w-56 flex flex-col z-50"
      style={{ background: 'linear-gradient(180deg, #0c1220 0%, #0a0e17 100%)', borderRight: '1px solid #1e293b' }}>
      <div className="px-5 py-5 border-b border-[#1e293b]">
        <div className="text-xs font-semibold tracking-[0.2em] text-[#64748b] uppercase">Syria</div>
        <div className="text-lg font-bold text-white mt-0.5">SOB Diagnostics</div>
        <div className="text-[10px] text-[#475569] mt-1">State-Owned Banks &middot; 2022-2024</div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`w-full text-left px-5 py-2.5 flex items-center gap-3 text-sm transition-all duration-150 ${
              activeTab === t.id
                ? 'bg-[#1e293b] text-white border-l-2 border-[#3b82f6]'
                : 'text-[#94a3b8] hover:text-white hover:bg-[#111827] border-l-2 border-transparent'
            }`}>
            <span className="text-base w-5 text-center opacity-70">{t.icon}</span>
            <span className="font-medium">{t.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-[#1e293b]">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(BANK_COLORS).map(([k, c]) => (
            <span key={k} className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: c + '22', color: c }}>{k}</span>
          ))}
        </div>
      </div>
    </aside>
  );
}
