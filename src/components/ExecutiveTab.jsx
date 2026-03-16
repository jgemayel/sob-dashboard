import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import KPICard from './KPICard';
import ChartCard from './ChartCard';
import { BANK_IDS, BANK_COLORS, BALANCE_SHEET, SECTOR_TOTALS, INCOME_STATEMENT, CAMELS, fmtB, YEARS } from '../data/bankData';

const CAMELS_LABELS = ['Capital', 'Assets', 'Management', 'Earnings', 'Liquidity', 'Sensitivity'];
const CAMELS_KEYS = ['capital', 'assets', 'management', 'earnings', 'liquidity', 'sensitivity'];

function camelsScore(val) {
  // Critical / Fail
  if (['FAIL', 'FAIL (adj.)', 'IMPAIRED', 'WEAK', 'DECLINING', 'EXTREME', 'HIGH'].includes(val))
    return { bg: '#991b1b', text: '#fca5a5' };
  // Warning / Caution
  if (['MARGINAL', 'FRAGILE', 'LEVERAGE-DRIVEN', 'MODERATE', 'CBS-DEPENDENT'].includes(val))
    return { bg: '#92400e', text: '#fcd34d' };
  // Adequate / Good
  if (['ADEQUATE', 'STRONG', 'LOW RISK', 'RECOVERING', 'LOW'].includes(val))
    return { bg: '#065f46', text: '#6ee7b7' };
  // Unknown / No data
  return { bg: '#374151', text: '#9ca3af' };
}

export default function ExecutiveTab() {
  const t = SECTOR_TOTALS;
  const eqAssets24 = ((t.equity[2] / t.assets[2]) * 100).toFixed(1);
  const assetGrowth = (((t.assets[2] - t.assets[1]) / t.assets[1]) * 100).toFixed(0);
  const profitGrowth = (((t.netProfit[2] - t.netProfit[1]) / t.netProfit[1]) * 100).toFixed(0);

  // Asset concentration donut
  const assetDonut = BANK_IDS.map(b => ({
    name: b,
    value: BALANCE_SHEET[b].assets[2],
  }));

  // Profit trend
  const profitBars = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = INCOME_STATEMENT[b].netProfit[i]; });
    return row;
  });

  // NII trend
  const niiBars = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = INCOME_STATEMENT[b].nii[i]; });
    return row;
  });

  const tt = ({ active, payload, label }) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
        <p className="text-xs font-semibold text-white mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: SYP {p.value?.toFixed?.(1) ?? p.value}B
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-[#94a3b8] leading-relaxed">
        This dashboard presents the consolidated diagnostic findings for Syria's 6 state-owned banks. All data is sourced from audited financial statements (2022-2024), validated through 90 automated checks with zero discrepancies. Key finding: the sector is structurally fragile — one bank holds 86% of assets, capital has been frozen since 2010, and all core banking systems are outdated.
      </p>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard label="Total Assets" value={fmtB(t.assets[2])} delta={Number(assetGrowth)} color="#3b82f6" sub="2024" />
        <KPICard label="Total Deposits" value={fmtB(t.deposits[2])} delta={(((t.deposits[2]-t.deposits[1])/t.deposits[1])*100).toFixed(0)*1} color="#10b981" sub="2024" />
        <KPICard label="Total Equity" value={fmtB(t.equity[2])} delta={(((t.equity[2]-t.equity[1])/t.equity[1])*100).toFixed(0)*1} color="#f59e0b" sub="2024" />
        <KPICard label="Net Profit" value={`SYP ${t.netProfit[2].toFixed(0)}B`} delta={Number(profitGrowth)} color="#8b5cf6" sub="2024" />
        <KPICard label="Paid-up Capital" value={`SYP ${t.paidUpCapital}B`} sub="Unchanged since 2009-2011" color="#ec4899" />
        <KPICard label="Equity / Assets" value={`${eqAssets24}%`} sub="Sector average (reported)" color="#06b6d4" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Asset Concentration — 2024" subtitle="CBS dominates with 86% of sector assets">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={assetDonut} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                dataKey="value" nameKey="name" paddingAngle={2} stroke="none">
                {assetDonut.map((e, i) => <Cell key={i} fill={BANK_COLORS[e.name]} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0];
                const pct = ((d.value / t.assets[2]) * 100).toFixed(1);
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white">{d.name}: {fmtB(d.value)}</p>
                    <p className="text-xs text-[#94a3b8]">{pct}% of sector</p>
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Net Profit by Bank" subtitle="SYP Billions — 2022-2024">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={profitBars}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="NII Trend" subtitle="Net Interest Income — SYP Billions">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={niiBars}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* CAMELS Heatmap */}
      <ChartCard title="CAMELS Assessment Heatmap" subtitle="Composite qualitative assessment across all six banks">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-[#64748b] font-medium">Dimension</th>
                {BANK_IDS.map(b => <th key={b} className="py-2 px-3 text-center font-medium" style={{ color: BANK_COLORS[b] }}>{b}</th>)}
              </tr>
            </thead>
            <tbody>
              {CAMELS_KEYS.map((k, i) => (
                <tr key={k} className="border-t border-[#1e293b]">
                  <td className="py-2 px-3 text-[#94a3b8] font-medium">{CAMELS_LABELS[i]}</td>
                  {BANK_IDS.map(b => {
                    const val = CAMELS[k][b];
                    const s = camelsScore(val);
                    return (
                      <td key={b} className="py-2 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ background: s.bg, color: s.text }}>
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
      <p className="text-xs text-[#64748b] leading-relaxed px-1">
        CAMELS assessment based on: Capital adequacy (Basel III benchmarks), Asset quality (NPL data where available), Management (governance framework), Earnings (sustainability and diversification), Liquidity (funding concentration), Sensitivity (FX and sanctions exposure). Color coding: Red = Critical gap, Amber = Significant gap, Green = Adequate, Gray = Data unavailable.
      </p>
    </div>
  );
}
