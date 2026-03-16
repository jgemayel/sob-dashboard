export default function KPICard({ label, value, sub, color = '#3b82f6', delta }) {
  return (
    <div className="rounded-xl p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)', border: '1px solid #1e293b' }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5" style={{ background: color, transform: 'translate(30%,-30%)' }} />
      <div className="text-[11px] font-semibold tracking-wider uppercase text-[#64748b] mb-2">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {delta !== undefined && (
        <span className={`text-xs font-medium mt-1 inline-block ${delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {delta >= 0 ? '+' : ''}{delta}%
        </span>
      )}
      {sub && <div className="text-xs text-[#64748b] mt-1">{sub}</div>}
    </div>
  );
}
