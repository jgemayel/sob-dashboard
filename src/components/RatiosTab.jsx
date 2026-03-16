import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine, Cell } from 'recharts';
import ChartCard from './ChartCard';
import { BANK_IDS, BANK_COLORS, RATIOS, YEARS, BENCHMARKS } from '../data/bankData';

const tt = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
      <p className="text-xs font-semibold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value?.toFixed?.(2) ?? p.value}%</p>
      ))}
    </div>
  );
};

function makeTimeSeries(ratioKey) {
  return YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => {
      if (RATIOS[ratioKey][b]) row[b] = RATIOS[ratioKey][b][i];
    });
    return row;
  });
}

function makeLatestBar(ratioKey, yr = 2) {
  return BANK_IDS.filter(b => RATIOS[ratioKey][b]).map(b => ({
    bank: b,
    value: RATIOS[ratioKey][b][yr],
    fill: BANK_COLORS[b],
  }));
}

export default function RatiosTab() {
  const roaData = makeTimeSeries('roa');
  const roeData = makeTimeSeries('roe');
  const nimData = makeTimeSeries('nim');
  const ciData = makeTimeSeries('costIncome');
  const eqaData = makeTimeSeries('equityAssets');
  const levData = makeTimeSeries('leverage');
  const dlData = makeTimeSeries('depositsLiab');
  const nplBar = makeLatestBar('npl');

  const banks = (ratioKey) => BANK_IDS.filter(b => RATIOS[ratioKey][b]);

  return (
    <div className="space-y-6">
      <p className="text-xs text-[#94a3b8] leading-relaxed">
        Prudential ratios across 6 dimensions with MENA peer benchmarks and Basel III reference lines. CBS ROA of 0.10% is significantly below all regional peers. ACB and PCB ROE of 66-70% is a function of extreme leverage (52x and 30x respectively), not operational performance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Return on Assets (ROA %)" subtitle="MENA avg: 1-2%">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={roaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <ReferenceLine y={1} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'MENA Low', fill: '#ef4444', fontSize: 10 }} />
              <ReferenceLine y={2} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'MENA High', fill: '#ef4444', fontSize: 10 }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('roa').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Return on Equity (ROE %)" subtitle="Wide dispersion reflects FX-driven equity">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={roeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('roe').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Net Interest Margin (NIM %)" subtitle="MENA avg: 2.5-4%">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={nimData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <ReferenceLine y={2.5} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'MENA Low', fill: '#f59e0b', fontSize: 10 }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('nim').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Cost-to-Income Ratio (%)" subtitle="Lower is better — CBS anomaly in 2023 (0.5%)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ciData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('costIncome').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Equity / Assets (%)" subtitle="Basel III leverage floor: 3%">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={eqaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <ReferenceLine y={BENCHMARKS.baselIII.leverage} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Basel III', fill: '#ef4444', fontSize: 10 }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('equityAssets').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Leverage Ratio (x)" subtitle="Assets / Equity">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={levData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value?.toFixed?.(1)}x</p>)}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('leverage').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Deposits / Liabilities (%)" subtitle="Funding structure indicator">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dlData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={tt} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              {banks('depositsLiab').map(b => <Line key={b} type="monotone" dataKey={b} stroke={BANK_COLORS[b]} strokeWidth={2} dot={{ r: 4, fill: BANK_COLORS[b] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="NPL Ratio (%) — 2024" subtitle="Only IB and ACB report NPL data">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={nplBar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="bank" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white">{payload[0].payload.bank}: {payload[0].value}%</p>
                  </div>
                );
              }} />
              <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'MENA Avg High', fill: '#ef4444', fontSize: 10 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {nplBar.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
