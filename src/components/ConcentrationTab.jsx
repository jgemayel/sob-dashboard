import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import ChartCard from './ChartCard';
import KPICard from './KPICard';
import { BANK_IDS, BANK_COLORS, BALANCE_SHEET, SECTOR_TOTALS, YEARS, fmtB } from '../data/bankData';

function hhi(shares) {
  return shares.reduce((s, v) => s + v * v, 0);
}

export default function ConcentrationTab() {
  // Market shares 2024
  const assetShares = BANK_IDS.map(b => (BALANCE_SHEET[b].assets[2] / SECTOR_TOTALS.assets[2]) * 100);
  const depositShares = BANK_IDS.map(b => (BALANCE_SHEET[b].deposits[2] / SECTOR_TOTALS.deposits[2]) * 100);
  const equityShares = BANK_IDS.map(b => (BALANCE_SHEET[b].equity[2] / SECTOR_TOTALS.equity[2]) * 100);

  const hhiAssets = hhi(assetShares).toFixed(0);
  const hhiDeposits = hhi(depositShares).toFixed(0);
  const hhiEquity = hhi(equityShares).toFixed(0);

  const cbsAssetPct = assetShares[0].toFixed(1);
  const cbsDepPct = depositShares[0].toFixed(1);
  const cbsEqPct = equityShares[0].toFixed(1);

  // HHI over time
  const hhiTrend = YEARS.map((y, i) => {
    const aShares = BANK_IDS.map(b => (BALANCE_SHEET[b].assets[i] / SECTOR_TOTALS.assets[i]) * 100);
    const dShares = BANK_IDS.map(b => (BALANCE_SHEET[b].deposits[i] / SECTOR_TOTALS.deposits[i]) * 100);
    return {
      year: y.toString(),
      'HHI Assets': hhi(aShares),
      'HHI Deposits': hhi(dShares),
    };
  });

  // CBS dominance breakdown
  const cbsDominance = [
    { metric: 'Assets', CBS: Number(cbsAssetPct), Others: (100 - Number(cbsAssetPct)).toFixed(1) * 1 },
    { metric: 'Deposits', CBS: Number(cbsDepPct), Others: (100 - Number(cbsDepPct)).toFixed(1) * 1 },
    { metric: 'Equity', CBS: Number(cbsEqPct), Others: (100 - Number(cbsEqPct)).toFixed(1) * 1 },
  ];

  // ACB funding dependency — CBS borrowing as % of ACB liabilities
  const acbDep = YEARS.map((y, i) => ({
    year: y.toString(),
    'CBS Borrowing': BALANCE_SHEET.ACB.cbsBorrowing[i],
    'Other Liabilities': BALANCE_SHEET.ACB.liabilities[i] - BALANCE_SHEET.ACB.cbsBorrowing[i],
    'CBS Borrowing %': ((BALANCE_SHEET.ACB.cbsBorrowing[i] / BALANCE_SHEET.ACB.liabilities[i]) * 100).toFixed(1) * 1,
  }));

  // Equity composition — CBS real vs FX
  const eqComp = YEARS.map((y, i) => ({
    year: y.toString(),
    'FX Reserve': BALANCE_SHEET.CBS.fxReserve[i],
    'Other Equity': BALANCE_SHEET.CBS.equity[i] - BALANCE_SHEET.CBS.fxReserve[i],
  }));

  // Market share donut 2024
  const msPie = BANK_IDS.map(b => ({
    name: b,
    value: BALANCE_SHEET[b].assets[2],
  }));

  return (
    <div className="space-y-6">
      <p className="text-xs text-[#94a3b8] leading-relaxed">
        Concentration risk analysis using the Herfindahl-Hirschman Index (HHI). A score above 2,500 indicates a highly concentrated market. Syria's SOB sector scores ~7,500 on assets — among the most concentrated banking sectors globally. CBS holds 86% of assets, 90% of deposits, and 98% of equity.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <KPICard label="HHI Assets" value={hhiAssets} color="#ef4444" sub=">2500 = highly concentrated" />
        <KPICard label="HHI Deposits" value={hhiDeposits} color="#f59e0b" sub=">2500 = highly concentrated" />
        <KPICard label="HHI Equity" value={hhiEquity} color="#8b5cf6" sub=">2500 = highly concentrated" />
        <KPICard label="CBS Asset Share" value={`${cbsAssetPct}%`} color="#3b82f6" sub="Dominant player" />
        <KPICard label="CBS Deposit Share" value={`${cbsDepPct}%`} color="#10b981" />
        <KPICard label="CBS Equity Share" value={`${cbsEqPct}%`} color="#06b6d4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="CBS Dominance — Share of Sector (%)" subtitle="Assets / Deposits / Equity">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cbsDominance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}%</p>)}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Bar dataKey="CBS" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Others" stackId="a" fill="#1e293b" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="HHI Trend (2022-2024)" subtitle=">2500 = highly concentrated, >1500 = moderately">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hhiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value?.toFixed?.(0)}</p>)}
                  </div>
                );
              }} />
              <ReferenceLine y={2500} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Highly Concentrated', fill: '#ef4444', fontSize: 10 }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Line type="monotone" dataKey="HHI Assets" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="HHI Deposits" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="ACB Funding Dependency on CBS" subtitle="CBS borrowing as share of ACB liabilities">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={acbDep}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => fmtB(v)} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {fmtB(p.value)}</p>)}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Bar dataKey="CBS Borrowing" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Other Liabilities" stackId="a" fill="#1e293b" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-3 text-xs text-[#94a3b8]">
            {acbDep.map(d => (
              <div key={d.year}><span className="font-semibold text-white">{d.year}:</span> {d['CBS Borrowing %']}% from CBS</div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="CBS Equity Composition" subtitle="FX reserve vs other equity — SYP Billions">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={eqComp}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => fmtB(v)} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => {
                      const total = BALANCE_SHEET.CBS.equity[YEARS.indexOf(Number(label))];
                      return <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {fmtB(p.value)} ({((p.value/total)*100).toFixed(0)}%)</p>;
                    })}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Bar dataKey="FX Reserve" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Other Equity" stackId="a" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Market share detail table */}
      <ChartCard title="Market Share Detail — 2024" subtitle="All figures in SYP Billions">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-[#64748b]">Bank</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Assets</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Share</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Deposits</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Share</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Equity</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Share</th>
              </tr>
            </thead>
            <tbody>
              {BANK_IDS.map((b, idx) => (
                <tr key={b} className="border-t border-[#1e293b]">
                  <td className="py-2 px-3 font-semibold" style={{ color: BANK_COLORS[b] }}>{b}</td>
                  <td className="py-2 px-3 text-right text-white">{fmtB(BALANCE_SHEET[b].assets[2])}</td>
                  <td className="py-2 px-3 text-right text-[#94a3b8]">{assetShares[idx].toFixed(1)}%</td>
                  <td className="py-2 px-3 text-right text-white">{fmtB(BALANCE_SHEET[b].deposits[2])}</td>
                  <td className="py-2 px-3 text-right text-[#94a3b8]">{depositShares[idx].toFixed(1)}%</td>
                  <td className="py-2 px-3 text-right text-white">{fmtB(BALANCE_SHEET[b].equity[2])}</td>
                  <td className="py-2 px-3 text-right text-[#94a3b8]">{equityShares[idx].toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
