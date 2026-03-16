import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import ChartCard from './ChartCard';
import { BANK_IDS, BANK_COLORS, BALANCE_SHEET, INCOME_STATEMENT, SECTOR_TOTALS, YEARS, fmtB } from '../data/bankData';

const tt = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
      <p className="text-xs font-semibold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: SYP {typeof p.value === 'number' ? (p.value >= 1000 ? (p.value/1000).toFixed(1)+'T' : p.value.toFixed(1)+'B') : p.value}</p>
      ))}
    </div>
  );
};

export default function FinancialTab() {
  // Balance sheet stacked bars
  const bsData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = BALANCE_SHEET[b].assets[i]; });
    return row;
  });

  // Deposit growth
  const depData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = BALANCE_SHEET[b].deposits[i]; });
    return row;
  });

  // Credit/Loans
  const creditData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => {
      row[b] = BALANCE_SHEET[b].credit?.[i] || BALANCE_SHEET[b].loans?.[i] || 0;
    });
    return row;
  });

  // Income statement — interest income
  const iiData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = INCOME_STATEMENT[b].interestIncome[i]; });
    return row;
  });

  // NII
  const niiData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = INCOME_STATEMENT[b].nii[i]; });
    return row;
  });

  // Sector totals trend
  const sectorTrend = YEARS.map((y, i) => ({
    year: y.toString(),
    Assets: SECTOR_TOTALS.assets[i],
    Deposits: SECTOR_TOTALS.deposits[i],
    Equity: SECTOR_TOTALS.equity[i],
  }));

  // Asset growth YoY per bank
  const assetGrowth = BANK_IDS.map(b => ({
    bank: b,
    '2022-23': (((BALANCE_SHEET[b].assets[1] - BALANCE_SHEET[b].assets[0]) / BALANCE_SHEET[b].assets[0]) * 100).toFixed(0) * 1,
    '2023-24': (((BALANCE_SHEET[b].assets[2] - BALANCE_SHEET[b].assets[1]) / BALANCE_SHEET[b].assets[1]) * 100).toFixed(0) * 1,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Total Assets by Bank (Stacked)" subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total Deposits by Bank (Stacked)" subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={depData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Credit / Loans by Bank" subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={creditData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sector Totals Trend" subtitle="Assets / Deposits / Equity">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sectorTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => (
                      <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {fmtB(p.value)}</p>
                    ))}
                  </div>
                );
              }} />
              <Area type="monotone" dataKey="Assets" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} />
              <Area type="monotone" dataKey="Deposits" stroke="#10b981" fill="#10b98120" strokeWidth={2} />
              <Area type="monotone" dataKey="Equity" stroke="#f59e0b" fill="#f59e0b20" strokeWidth={2} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Interest Income by Bank" subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={iiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {BANK_IDS.map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Asset Growth Rate (YoY %)" subtitle="Percentage growth per period">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetGrowth} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="bank" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} width={40} />
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
              <Bar dataKey="2022-23" fill="#3b82f6" />
              <Bar dataKey="2023-24" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
