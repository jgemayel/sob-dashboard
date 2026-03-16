export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-xl p-5 ${className}`}
      style={{ background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)', border: '1px solid #1e293b' }}>
      {title && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-[#64748b] mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
