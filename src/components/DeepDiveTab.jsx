import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import ChartCard from './ChartCard';
import {
  BANK_IDS, BANK_COLORS, BANK_NAMES, BANK_PROFILES, BALANCE_SHEET,
  INCOME_STATEMENT, RATIOS, CAMELS, QUALITATIVE, YEARS, fmtB
} from '../data/bankData';

const CAMELS_KEYS = ['capital', 'assets', 'management', 'earnings', 'liquidity', 'sensitivity'];
const CAMELS_LABELS = ['Capital', 'Assets', 'Management', 'Earnings', 'Liquidity', 'Sensitivity'];

function severity(val) {
  const good = ['STRONG', 'ADEQUATE', 'LOW RISK', 'RECOVERING', 'LOW', 'MARGINAL'];
  const bad = ['FAIL', 'FAIL (adj.)', 'WEAK', 'IMPAIRED', 'EXTREME', 'DECLINING', 'HIGH'];
  if (good.includes(val)) return 'text-emerald-400';
  if (bad.includes(val)) return 'text-red-400';
  return 'text-yellow-400';
}

export default function DeepDiveTab() {
  const [selected, setSelected] = useState('CBS');
  const p = BANK_PROFILES[selected];
  const bs = BALANCE_SHEET[selected];
  const is = INCOME_STATEMENT[selected];
  const color = BANK_COLORS[selected];

  const bsTimeline = YEARS.map((y, i) => ({
    year: y.toString(),
    Assets: bs.assets[i],
    Deposits: bs.deposits[i],
    Equity: bs.equity[i],
    'Credit/Loans': bs.credit?.[i] || bs.loans?.[i] || 0,
    Liabilities: bs.liabilities[i],
  }));

  const isTimeline = YEARS.map((y, i) => ({
    year: y.toString(),
    'Interest Income': is.interestIncome[i],
    NII: is.nii[i],
    'Net Profit': is.netProfit[i],
    ...(is.interestExpense ? { 'Interest Expense': is.interestExpense[i] } : {}),
  }));

  const ratioKeys = ['roa', 'roe', 'nim', 'costIncome', 'equityAssets', 'leverage', 'depositsLiab'];
  const ratioLabels = ['ROA %', 'ROE %', 'NIM %', 'Cost/Income %', 'Equity/Assets %', 'Leverage x', 'Deposits/Liab %'];

  return (
    <div className="space-y-6">
      <p className="text-xs text-[#94a3b8] leading-relaxed">
        Select a bank to view its complete financial profile, qualitative assessment, and CAMELS rating. CBS and ACB have additional detail panels for FX reserves and CBS funding dependency.
      </p>

      {/* Bank selector */}
      <div className="flex items-center gap-3 flex-wrap">
        {BANK_IDS.map(b => (
          <button key={b} onClick={() => setSelected(b)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selected === b ? 'text-white shadow-lg' : 'text-[#94a3b8] hover:text-white'
            }`}
            style={{
              background: selected === b ? BANK_COLORS[b] + '33' : '#111827',
              border: selected === b ? `2px solid ${BANK_COLORS[b]}` : '1px solid #1e293b'
            }}>
            {b}
          </button>
        ))}
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title={`${BANK_NAMES[selected]} (${selected})`} subtitle={p.decree}>
          <div className="space-y-3 mt-2">
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Paid-up Capital</span><span className="text-white font-semibold">SYP {p.capital}B</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Last Capital Increase</span><span className="text-white font-semibold">{p.capitalYear}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Service Points</span><span className="text-white font-semibold">{p.servicePoints}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Branches / Offices</span><span className="text-white font-semibold">{p.branches} / {p.offices}</span></div>
            {p.damascus && <div className="flex justify-between text-sm"><span className="text-[#64748b]">Damascus</span><span className="text-white font-semibold">{p.damascus}</span></div>}
            {p.keyRegions && <div className="flex justify-between text-sm"><span className="text-[#64748b]">Key Regions</span><span className="text-white font-semibold">{p.keyRegions}</span></div>}
          </div>
        </ChartCard>

        <ChartCard title="Qualitative Assessment">
          <div className="space-y-3 mt-2">
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Core Banking</span><span className="text-white font-semibold text-right max-w-[180px]">{QUALITATIVE.coreBanking[selected]}</span></div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Sanctions</span>
              <span className={`font-bold text-sm ${
                QUALITATIVE.sanctions[selected] === 'SEVERE' ? 'text-red-400' :
                QUALITATIVE.sanctions[selected] === 'MODERATE' ? 'text-yellow-400' :
                QUALITATIVE.sanctions[selected] === 'MINIMAL' ? 'text-emerald-400' : 'text-[#94a3b8]'
              }`}>{QUALITATIVE.sanctions[selected]}</span>
            </div>
            <div className="text-xs text-[#64748b] italic">{QUALITATIVE.sanctionsDetail[selected]}</div>
            <div className="flex justify-between text-sm"><span className="text-[#64748b]">Capital Increase Post-2011</span>
              <span className={QUALITATIVE.capitalIncrease[selected] ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                {QUALITATIVE.capitalIncrease[selected] ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="CAMELS Ratings">
          <div className="space-y-2 mt-2">
            {CAMELS_KEYS.map((k, i) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-[#64748b]">{CAMELS_LABELS[i]}</span>
                <span className={`font-bold ${severity(CAMELS[k][selected])}`}>{CAMELS[k][selected]}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* BS Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title={`${selected} — Balance Sheet`} subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bsTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
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
              <Bar dataKey="Assets" fill={color} opacity={0.9} />
              <Bar dataKey="Deposits" fill="#10b981" />
              <Bar dataKey="Equity" fill="#f59e0b" />
              <Bar dataKey="Credit/Loans" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`${selected} — Income Statement`} subtitle="SYP Billions">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={isTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: SYP {p.value?.toFixed?.(1)}B</p>)}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Line type="monotone" dataKey="Interest Income" stroke={color} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="NII" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Net Profit" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              {is.interestExpense && <Line type="monotone" dataKey="Interest Expense" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />}
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Ratios Table */}
      <ChartCard title={`${selected} — Prudential Ratios`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-[#64748b] font-medium">Ratio</th>
                {YEARS.map(y => <th key={y} className="py-2 px-3 text-right text-[#64748b] font-medium">{y}</th>)}
                <th className="py-2 px-3 text-right text-[#64748b] font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {ratioKeys.map((k, idx) => {
                const vals = RATIOS[k][selected];
                if (!vals) return null;
                const trend = vals[2] - vals[0];
                return (
                  <tr key={k} className="border-t border-[#1e293b]">
                    <td className="py-2 px-3 text-[#94a3b8] font-medium">{ratioLabels[idx]}</td>
                    {vals.map((v, i) => <td key={i} className="py-2 px-3 text-right text-white">{v.toFixed(2)}</td>)}
                    <td className={`py-2 px-3 text-right font-semibold ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {trend >= 0 ? '+' : ''}{trend.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              {RATIOS.npl[selected] && (
                <tr className="border-t border-[#1e293b]">
                  <td className="py-2 px-3 text-[#94a3b8] font-medium">NPL Ratio %</td>
                  {RATIOS.npl[selected].map((v, i) => <td key={i} className="py-2 px-3 text-right text-white">{v.toFixed(1)}</td>)}
                  <td className={`py-2 px-3 text-right font-semibold ${RATIOS.npl[selected][2] < RATIOS.npl[selected][0] ? 'text-emerald-400' : 'text-red-400'}`}>
                    {(RATIOS.npl[selected][2] - RATIOS.npl[selected][0]).toFixed(1)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* CBS-specific: FX reserves */}
      {selected === 'CBS' && bs.fxReserve && (
        <ChartCard title="CBS FX Reserve" subtitle="SYP Billions — Revaluation gains drive equity">
          <div className="grid grid-cols-3 gap-4 mt-2">
            {YEARS.map((y, i) => (
              <div key={y} className="text-center">
                <div className="text-xs text-[#64748b]">{y}</div>
                <div className="text-xl font-bold text-white">{fmtB(bs.fxReserve[i])}</div>
                <div className="text-xs text-[#64748b]">{((bs.fxReserve[i] / bs.equity[i]) * 100).toFixed(0)}% of equity</div>
              </div>
            ))}
          </div>
        </ChartCard>
      )}

      {/* ACB-specific: CBS borrowing */}
      {selected === 'ACB' && bs.cbsBorrowing && (
        <ChartCard title="ACB Dependency on CBS Borrowing" subtitle="SYP Billions">
          <div className="grid grid-cols-3 gap-4 mt-2">
            {YEARS.map((y, i) => (
              <div key={y} className="text-center">
                <div className="text-xs text-[#64748b]">{y}</div>
                <div className="text-xl font-bold text-white">{fmtB(bs.cbsBorrowing[i])}</div>
                <div className="text-xs text-[#64748b]">{((bs.cbsBorrowing[i] / bs.liabilities[i]) * 100).toFixed(0)}% of liabilities</div>
              </div>
            ))}
          </div>
        </ChartCard>
      )}
    </div>
  );
}
