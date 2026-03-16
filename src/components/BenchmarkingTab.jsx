import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import ChartCard from './ChartCard';
import { BANK_IDS, BANK_COLORS, RATIOS, BENCHMARKS, BALANCE_SHEET } from '../data/bankData';

export default function BenchmarkingTab() {
  // Equity/Assets vs Basel III
  const eqData = BANK_IDS.map(b => ({
    bank: b,
    value: RATIOS.equityAssets[b][2],
    fill: BANK_COLORS[b],
  }));

  // CAR comparison — Syria vs peers
  const carComp = [
    { name: 'Basel III Min', value: BENCHMARKS.baselIII.totalCapital, fill: '#ef4444' },
    { name: 'Morocco SOBs', value: BENCHMARKS.moroccoSOBs.car, fill: '#f59e0b' },
    { name: 'Egypt SOBs', value: BENCHMARKS.egyptSOBs.car, fill: '#10b981' },
    { name: 'Jordan HB', value: BENCHMARKS.jordanHB.car, fill: '#3b82f6' },
    ...BANK_IDS.map(b => ({
      name: `Syria ${b}`,
      value: RATIOS.equityAssets[b][2],
      fill: BANK_COLORS[b],
    })),
  ];

  // ROA comparison
  const roaComp = [
    { name: 'MENA Low', value: 1.0, fill: '#475569' },
    { name: 'MENA High', value: 2.0, fill: '#64748b' },
    ...BANK_IDS.map(b => ({ name: b, value: RATIOS.roa[b][2], fill: BANK_COLORS[b] })),
  ];

  // NIM comparison
  const nimComp = [
    { name: 'MENA Low', value: 2.5, fill: '#475569' },
    { name: 'MENA High', value: 4.0, fill: '#64748b' },
    ...BANK_IDS.map(b => ({ name: b, value: RATIOS.nim[b][2], fill: BANK_COLORS[b] })),
  ];

  // NPL comparison
  const nplComp = [
    { name: 'MENA Low', value: 7, fill: '#475569' },
    { name: 'MENA High', value: 10, fill: '#64748b' },
    { name: 'IB', value: RATIOS.npl.IB[2], fill: BANK_COLORS.IB },
    { name: 'ACB', value: RATIOS.npl.ACB[2], fill: BANK_COLORS.ACB },
  ];

  // Leverage gap
  const levGap = BANK_IDS.map(b => ({
    bank: b,
    actual: RATIOS.leverage[b][2],
    baselMax: 33.3,  // 1/3% = 33.3x max
    fill: BANK_COLORS[b],
  }));

  const tt = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
        <p className="text-xs font-semibold text-white">{payload[0].payload.name || payload[0].payload.bank}: {payload[0].value?.toFixed?.(2) ?? payload[0].value}%</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary callout */}
      <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', border: '1px solid #312e81' }}>
        <h3 className="text-sm font-bold text-white mb-2">Syria SOBs vs International Standards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div><span className="text-[#64748b]">Basel III CET1</span><p className="text-red-400 font-bold text-lg">4.5%</p><p className="text-[#64748b]">4 of 6 banks FAIL</p></div>
          <div><span className="text-[#64748b]">Basel III Total Capital</span><p className="text-red-400 font-bold text-lg">8.0%</p><p className="text-[#64748b]">ACB: 1.9%, PCB: 3.4%</p></div>
          <div><span className="text-[#64748b]">MENA Avg ROA</span><p className="text-yellow-400 font-bold text-lg">1-2%</p><p className="text-[#64748b]">CBS: 0.10% (far below)</p></div>
          <div><span className="text-[#64748b]">MENA Avg NPL</span><p className="text-emerald-400 font-bold text-lg">7-10%</p><p className="text-[#64748b]">IB: 11.9% (above)</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Capital Adequacy: Syria vs MENA Peers" subtitle="Equity / Assets (proxy CAR) — 2024">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carComp} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} width={85} />
              <Tooltip content={tt} />
              <ReferenceLine x={BENCHMARKS.baselIII.totalCapital} stroke="#ef4444" strokeDasharray="5 5" />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {carComp.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="ROA Comparison — Syria vs MENA" subtitle="2024 values">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roaComp} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} width={80} />
              <Tooltip content={tt} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {roaComp.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="NIM Comparison — Syria vs MENA" subtitle="2024 values">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nimComp} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} width={80} />
              <Tooltip content={tt} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {nimComp.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="NPL Ratio: Syria vs MENA Average" subtitle="Only IB and ACB report NPLs">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nplComp} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} width={80} />
              <Tooltip content={tt} />
              <ReferenceLine x={10} stroke="#ef4444" strokeDasharray="5 5" />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {nplComp.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Gap quantification */}
      <ChartCard title="Capital Gap Quantification" subtitle="Equity/Assets vs Basel III 8% minimum">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-[#64748b]">Bank</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Equity/Assets 2024</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Basel III (8%)</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Gap (pp)</th>
                <th className="text-right py-2 px-3 text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody>
              {BANK_IDS.map(b => {
                const val = RATIOS.equityAssets[b][2];
                const gap = val - 8;
                return (
                  <tr key={b} className="border-t border-[#1e293b]">
                    <td className="py-2 px-3 font-semibold" style={{ color: BANK_COLORS[b] }}>{b}</td>
                    <td className="py-2 px-3 text-right text-white">{val.toFixed(1)}%</td>
                    <td className="py-2 px-3 text-right text-[#64748b]">8.0%</td>
                    <td className={`py-2 px-3 text-right font-bold ${gap >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{gap >= 0 ? '+' : ''}{gap.toFixed(1)}pp</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${gap >= 0 ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>
                        {gap >= 0 ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
