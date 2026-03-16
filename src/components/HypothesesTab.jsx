import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ReferenceLine, PieChart, Pie, Legend, LineChart, Line } from 'recharts';
import ChartCard from './ChartCard';
import {
  BANK_IDS, BANK_COLORS, BALANCE_SHEET, SECTOR_TOTALS, INCOME_STATEMENT,
  RATIOS, QUALITATIVE, CAMELS, YEARS, fmtB, BENCHMARKS, BRANCH_NETWORK
} from '../data/bankData';

const HYPOTHESES = [
  {
    id: 'H1',
    title: 'Capital Depletion',
    statement: 'SOBs are critically undercapitalized — adjusted equity is 0.8% of assets, 10x below the Basel III floor of 8%.',
    verdict: 'CONFIRMED',
    camels: 'Capital',
    summary: 'Paid-up capital has been frozen at SYP 154B since 2009-2011. CBS equity of SYP 20T is 98% unrealized FX gains that fail every Basel III CET1 eligibility test. The adjusted sector equity/assets ratio of 0.8% is the lowest documented for any operating banking system globally.',
    evidence: [
      'Total paid-up capital: SYP 154B — unchanged for 14+ years despite 298% asset growth',
      'CBS adjusted equity (ex-FX): SYP 404B — just 0.4% of SYP 97.2T assets',
      'ACB equity/assets: 1.9% with leverage of 52.6x (Basel max: 33x)',
      'PCB equity/assets: 3.4% — a 3.4% loss on assets would wipe out all equity',
      'Only IB increased capital post-2011 (in 2021); 4 of 6 banks have not recapitalized',
      'SYP 154B at 2010 rates ≈ USD 3.4B; at 2024 rates ≈ USD 12M — 99.6% real erosion',
    ],
    benchmarks: [
      { name: 'Syria SOBs (adj.)', value: 0.8 },
      { name: 'Basel III Min', value: 8.0 },
      { name: 'Iraq SOBs (2005)', value: 4.0 },
      { name: 'Egypt SOBs', value: 14.0 },
      { name: 'Jordan HB', value: 16.0 },
      { name: 'Morocco SOBs', value: 13.0 },
    ],
  },
  {
    id: 'H2',
    title: 'Asset Quality Opacity',
    statement: 'Asset quality is either severely impaired or unmeasurable — both outcomes are disqualifying for a functioning banking system.',
    verdict: 'CONFIRMED',
    camels: 'Assets',
    summary: 'NPL data is unavailable for 4 of 6 banks covering 90% of sector assets. CBS self-reports SYP 3.47T in "old" NPLs (14.4% ratio) but this is likely understated by 2-3x based on post-conflict precedents. No bank implements IFRS 9, IFRS 7, or Basel Pillar 3 disclosure.',
    evidence: [
      'CBS (86% of assets): NPL ratio not disclosed in financial statements',
      'CBS survey data: SYP 3.47T "old" NPLs vs. SYP 24.1T loan book = 14.4% self-reported',
      'Post-conflict comparison: Iraq SOBs had 50-70% NPLs; Lebanon 30-50%; Libya 35%',
      'IB NPL ratio: 65.1% (2022) → 11.9% (2024) — improving but still above MENA 7-10%',
      'ACB NPL ratio: 0.7% — suspiciously low for agricultural lending in a conflict zone',
      'No IFRS 9 expected credit loss provisioning at any bank',
      'No independent external audit — government auditor only',
    ],
    benchmarks: [
      { name: 'ACB (reported)', value: 0.7 },
      { name: 'MENA Average', value: 8.5 },
      { name: 'IB', value: 11.9 },
      { name: 'CBS (self-rpt)', value: 14.4 },
      { name: 'CBS (OW est.)', value: 30.0 },
      { name: 'Iraq (2005)', value: 60.0 },
    ],
  },
  {
    id: 'H3',
    title: 'Earnings Fragility',
    statement: 'Reported profitability is driven by FX accounting and unsustainable leverage, not core banking operations.',
    verdict: 'CONFIRMED',
    camels: 'Earnings',
    summary: 'Sector profit growth decelerated from +160% (2023) to +5% (2024). CBS profit fell 30% YoY. ACB\'s 66% ROE is a leverage artifact (52.6x leverage, 1,353% LDR). Only IB and SB have sustainable earnings models. Revenue is ~95% NII with zero diversification.',
    evidence: [
      'CBS profit declined 30% YoY: SYP 131.9B (2023) → SYP 92.5B (2024)',
      'CBS ROA of 0.10% is far below any MENA peer (Egypt: 1.7%, Jordan: 1.3%)',
      'ACB ROE of 66% driven entirely by 52.6x leverage — not operational efficiency',
      'ACB borrows SYP 9.4T from CBS to lend at spread — circular funding chain',
      'REB profit collapsed 63%: SYP 35.0B → SYP 12.8B (capital losses of SYP 19.8B)',
      'Cost-to-income ratios (11-52%) reflect wage suppression and zero tech investment',
      'Revenue mix ~95% NII vs. MENA norm 65-75% — zero diversification',
    ],
    benchmarks: [
      { name: 'CBS', value: 0.10 },
      { name: 'REB', value: 0.46 },
      { name: 'MENA Low', value: 1.0 },
      { name: 'ACB', value: 1.26 },
      { name: 'MENA High', value: 2.0 },
      { name: 'IB', value: 2.17 },
      { name: 'SB', value: 2.43 },
    ],
  },
  {
    id: 'H4',
    title: 'Liquidity Concentration',
    statement: 'System-wide liquidity depends on CBS alone — a single point of failure with no backstop, no deposit insurance, and no lender of last resort.',
    verdict: 'CONFIRMED',
    camels: 'Liquidity',
    summary: 'CBS holds 90% of deposits and funds 87% of ACB\'s liabilities through SYP 9.4T in interbank lending. Any CBS stress event would cascade across the entire banking system. No deposit insurance scheme exists. Post-conflict precedent (Lebanon, Iraq, Afghanistan) shows this architecture produces systemic collapse.',
    evidence: [
      'CBS holds 89.7% of all customer deposits (SYP 35.5T of 39.6T)',
      'ACB funding: 87.5% from CBS borrowing, only 6.6% from deposits',
      'ACB LDR of 1,353% — lends 13x its deposit base using CBS wholesale funding',
      'CBS → ACB → cooperatives: SYP 9.4T flows through a single corridor',
      'No deposit insurance scheme exists in Syria',
      'No formal lender of last resort mechanism',
      'Lebanon (2019): BdL as sole liquidity provider → total system collapse when BdL failed',
      'Afghanistan (2021): SWIFT cutoff froze dominant bank → entire payment system collapsed',
    ],
    benchmarks: [
      { name: 'ACB (Dep/Liab)', value: 6.6 },
      { name: 'CBS', value: 46.0 },
      { name: 'REB', value: 70.2 },
      { name: 'PCB', value: 80.4 },
      { name: 'SB', value: 83.5 },
      { name: 'IB', value: 89.3 },
    ],
  },
  {
    id: 'H5',
    title: 'Operational Obsolescence',
    statement: 'Core banking systems, branch networks, and human capital have deteriorated below minimum safe operating levels.',
    verdict: 'CONFIRMED',
    camels: 'Management',
    summary: 'CBS — the bank holding 86% of assets — runs on a core banking system that has been out of vendor support for 6-7 years. No bank offers digital banking, mobile banking, or credit cards. Sanctions block system upgrades. Brain drain has depleted risk, IT, and compliance talent. Branches in 5+ governorates have been destroyed.',
    evidence: [
      'CBS core banking: expired and unsupported for 6-7 years — any system failure halts 86% of banking',
      'SB core banking: still in testing/trial phase — not yet deployed',
      'Zero digital banking channels at any bank (no mobile, no internet banking, no cards)',
      'AML/CFT: manual processes only — no automated transaction monitoring at any bank',
      'CBS SWIFT access: disconnected by sanctions — no cross-border payments',
      'CBS Visa/Mastercard: blocked — no card payment capabilities',
      'Destroyed branches: Raqqa, Idlib, Deir ez-Zor, Abu Kamal, Mayadin, Jisr al-Shughur',
      'Brain drain: skilled staff emigrating since 2011; wages far below market',
      'No data warehouse, BI, or automated regulatory reporting at any bank',
    ],
    benchmarks: null,
  },
  {
    id: 'H6',
    title: 'Governance & Regulatory Vacuum',
    statement: 'Legal frameworks, board structures, and prudential oversight fail every international standard — Basel, IFRS, FATF, OECD SOE Guidelines.',
    verdict: 'CONFIRMED',
    camels: 'Sensitivity',
    summary: '6 banks operate under 6 different formation laws from 6 different decades (1959-2006). Zero independent board directors across the entire sector. No audit committees, risk committees, or remuneration committees. No Basel framework implemented. No IFRS 9 for loan provisioning. No automated AML/CFT. These banks would not receive a license in any regulated jurisdiction.',
    evidence: [
      '6 separate formation laws: Decree 28/1959, Decree 28/1966, Decree 108/1966, Law 3/1969, Decree 29/1975, Decree 35/2006',
      'Zero independent board directors at any bank (BCBS requires majority independent)',
      'No audit committee, risk committee, or remuneration committee at any bank',
      'No CRO function — risk management is minimal/informal',
      'No external independent audit — government auditor only (OECD requires Big 4)',
      'Basel III: not implemented — no RWA calculation, no CET1, no LCR, no NSFR',
      'IFRS 9: not implemented — no expected credit loss provisioning',
      'AML/CFT: basic manual processes — not aligned with FATF 40 Recommendations',
      'No merger provision in any formation law — legal barrier to consolidation',
      'Egypt, Morocco, Vietnam, India all unified their SOB laws as first reform step',
    ],
    benchmarks: null,
  },
];

function VerdictBadge({ verdict }) {
  const colors = {
    CONFIRMED: { bg: '#991b1b', text: '#fca5a5', border: '#dc2626' },
    PARTIALLY: { bg: '#92400e', text: '#fcd34d', border: '#f59e0b' },
    REJECTED: { bg: '#065f46', text: '#6ee7b7', border: '#10b981' },
  };
  const c = colors[verdict] || colors.CONFIRMED;
  return (
    <span style={{
      fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '6px',
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
    }}>
      {verdict}
    </span>
  );
}

function EvidenceList({ items }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Supporting Evidence
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5 }}>
            <span style={{ color: '#3b82f6', fontWeight: 700, flexShrink: 0 }}>›</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenchmarkChart({ data, unit = '%', title }) {
  if (!data) return null;
  const syriaItems = data.filter(d => !['Basel III Min', 'MENA Low', 'MENA High', 'MENA Average', 'Iraq (2005)', 'Iraq SOBs (2005)', 'Egypt SOBs', 'Jordan HB', 'Morocco SOBs'].includes(d.name));
  const benchItems = data.filter(d => ['Basel III Min', 'MENA Low', 'MENA High', 'MENA Average', 'Iraq (2005)', 'Iraq SOBs (2005)', 'Egypt SOBs', 'Jordan HB', 'Morocco SOBs'].includes(d.name));

  const chartData = data.map(d => ({
    ...d,
    fill: benchItems.find(b => b.name === d.name)
      ? '#475569'
      : (BANK_COLORS[d.name] || (d.name.includes('Syria') ? '#ef4444' : (d.name.includes('OW') ? '#f59e0b' : '#3b82f6'))),
  }));

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title || 'Benchmark Comparison'}
      </div>
      <ResponsiveContainer width="100%" height={Math.max(180, data.length * 32)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }}
            tickFormatter={v => `${v}${unit}`} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} width={110} />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div style={{ background: '#1a2332', border: '1px solid #2d3748', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{payload[0].payload.name}: {payload[0].value}{unit}</p>
              </div>
            );
          }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
            {chartData.map((e, i) => <Cell key={i} fill={e.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// H1 specific: Capital timeline + FX waterfall
function H1Detail() {
  const capitalData = BANK_IDS.map(b => ({
    bank: b,
    'Equity/Assets %': RATIOS.equityAssets[b][2],
    fill: BANK_COLORS[b],
  }));

  const fxData = [
    { name: 'Reported Equity', value: 20047, fill: '#1e293b' },
    { name: 'Less: FX Reserve', value: 19643, fill: '#f59e0b' },
    { name: 'Adjusted Equity', value: 404, fill: '#ef4444' },
    { name: 'Paid-up Capital', value: 70, fill: '#3b82f6' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <ChartCard title="Equity / Assets by Bank (2024)" subtitle="Basel III minimum: 8% — only CBS (inflated) and SB meet it">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={capitalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="bank" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
            <ReferenceLine y={8} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Basel III 8%', fill: '#ef4444', fontSize: 9 }} />
            <Bar dataKey="Equity/Assets %" radius={[4, 4, 0, 0]}>
              {capitalData.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="CBS Equity Decomposition (SYP B)" subtitle="98% of CBS equity is unrealized FX gains — not real capital">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={fxData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}T` : `${v}B`} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {fxData.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

// H3 specific: Profit trends
function H3Detail() {
  const profitData = YEARS.map((y, i) => {
    const row = { year: y.toString() };
    BANK_IDS.forEach(b => { row[b] = INCOME_STATEMENT[b].netProfit[i]; });
    return row;
  });

  const roaData = BANK_IDS.map(b => ({
    bank: b,
    'ROA %': RATIOS.roa[b][2],
    fill: BANK_COLORS[b],
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <ChartCard title="Net Profit by Bank (SYP B)" subtitle="CBS profit fell 30% in 2024; sector growth decelerated to +5%">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
            {BANK_IDS.map(b => <Bar key={b} dataKey={b} stackId="a" fill={BANK_COLORS[b]} />)}
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="ROA by Bank (2024)" subtitle="MENA peer range: 1-2% — CBS at 0.10% is far below">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={roaData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="bank" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => `${v}%`} />
            <ReferenceLine y={1.0} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'MENA Low', fill: '#f59e0b', fontSize: 9 }} />
            <Bar dataKey="ROA %" radius={[4, 4, 0, 0]}>
              {roaData.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

// H4 specific: ACB dependency
function H4Detail() {
  const fundingData = YEARS.map((y, i) => ({
    year: y.toString(),
    'CBS Borrowing': BALANCE_SHEET.ACB.cbsBorrowing[i],
    'Other Liabilities': BALANCE_SHEET.ACB.liabilities[i] - BALANCE_SHEET.ACB.cbsBorrowing[i],
  }));

  const depositShare = [
    { name: 'CBS', value: 89.7 },
    { name: 'Others', value: 10.3 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <ChartCard title="ACB Funding: CBS Borrowing vs Other" subtitle="87.5% of ACB liabilities come from CBS — single source dependency">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={fundingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={{ stroke: '#1e293b' }} tickFormatter={v => fmtB(v)} />
            <Bar dataKey="CBS Borrowing" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Other Liabilities" stackId="a" fill="#1e293b" />
            <Legend formatter={v => <span style={{ fontSize: '10px', color: '#94a3b8' }}>{v}</span>} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="Deposit Market Share" subtitle="CBS captures 89.7% of all customer deposits — systemic concentration">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={depositShare} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
              dataKey="value" nameKey="name" paddingAngle={2} stroke="none">
              <Cell fill="#3b82f6" />
              <Cell fill="#1e293b" />
            </Pie>
            <Legend formatter={v => <span style={{ fontSize: '10px', color: '#94a3b8' }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

// H5 specific: Technology status
function H5Detail() {
  const techData = [
    { capability: 'Core Banking', standard: 'Supported, vendor-backed', cbs: 'EXPIRED 6-7 yrs', others: 'Functional / Testing', gap: 'CRITICAL' },
    { capability: 'Digital / Mobile', standard: 'App + internet banking', cbs: 'NONE', others: 'NONE', gap: 'TOTAL' },
    { capability: 'AML/CFT', standard: 'Automated monitoring', cbs: 'Manual', others: 'Manual', gap: 'TOTAL' },
    { capability: 'SWIFT', standard: 'Connected', cbs: 'DISCONNECTED', others: 'N/A', gap: 'SEVERE' },
    { capability: 'Cards (Visa/MC)', standard: 'Issuance + acquiring', cbs: 'SANCTIONED', others: 'NONE', gap: 'TOTAL' },
    { capability: 'Data Warehouse', standard: 'Centralized analytics', cbs: 'NONE', others: 'NONE', gap: 'TOTAL' },
  ];

  const gapColors = { CRITICAL: '#ef4444', TOTAL: '#dc2626', SEVERE: '#f59e0b' };

  return (
    <div style={{ marginTop: '16px' }}>
      <ChartCard title="Technology Maturity Gap Assessment" subtitle="Current state vs. minimum international standards for safe banking">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Capability', 'Intl. Minimum', 'CBS', 'Other Banks', 'Gap'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #1e293b' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techData.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px 12px', color: '#e2e8f0', fontWeight: 600 }}>{r.capability}</td>
                  <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.standard}</td>
                  <td style={{ padding: '8px 12px', color: r.cbs.includes('EXPIRED') || r.cbs === 'DISCONNECTED' || r.cbs === 'SANCTIONED' ? '#fca5a5' : (r.cbs === 'NONE' || r.cbs === 'Manual' ? '#fcd34d' : '#94a3b8'), fontWeight: 600 }}>{r.cbs}</td>
                  <td style={{ padding: '8px 12px', color: r.others === 'NONE' || r.others === 'Manual' ? '#fcd34d' : '#94a3b8' }}>{r.others}</td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: gapColors[r.gap] + '22', color: gapColors[r.gap] }}>{r.gap}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

// H6 specific: Formation law comparison
function H6Detail() {
  const laws = [
    { bank: 'IB', year: 1959, law: 'Decree 28', mandate: 'Industrial', board: 'Govt appointed', merger: 'None' },
    { bank: 'REB', year: 1966, law: 'Decree 28', mandate: 'Real estate', board: 'Govt appointed', merger: 'None' },
    { bank: 'PCB', year: 1966, law: 'Decree 108', mandate: 'Consumer', board: 'Govt appointed', merger: 'None' },
    { bank: 'ACB', year: 1969, law: 'Law 3', mandate: 'Agriculture', board: 'Cooperative', merger: 'None' },
    { bank: 'SB', year: 1975, law: 'Decree 29', mandate: 'Savings', board: 'Govt appointed', merger: 'None' },
    { bank: 'CBS', year: 2006, law: 'Decree 35', mandate: 'Universal', board: 'Govt appointed', merger: 'None' },
  ];

  const govGaps = [
    { dimension: 'Board Independence', standard: 'Majority independent (BCBS)', syria: 'Zero independent directors', gap: 'TOTAL' },
    { dimension: 'Board Committees', standard: 'Audit, Risk, Remuneration', syria: 'No formal committees', gap: 'TOTAL' },
    { dimension: 'External Audit', standard: 'Independent Big 4', syria: 'Government auditor only', gap: 'TOTAL' },
    { dimension: 'Basel III', standard: 'CET1, LCR, NSFR, stress tests', syria: 'Not implemented', gap: 'TOTAL' },
    { dimension: 'IFRS 9', standard: 'Expected credit loss model', syria: 'Not implemented', gap: 'TOTAL' },
    { dimension: 'AML/CFT', standard: 'FATF 40 Recommendations', syria: 'Basic manual processes', gap: 'TOTAL' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <ChartCard title="Formation Law Fragmentation" subtitle="6 banks under 6 different laws from 6 decades">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Bank', 'Year', 'Law', 'Mandate', 'Board', 'Merger'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #1e293b' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {laws.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '6px 8px', color: BANK_COLORS[r.bank], fontWeight: 600 }}>{r.bank}</td>
                  <td style={{ padding: '6px 8px', color: '#e2e8f0' }}>{r.year}</td>
                  <td style={{ padding: '6px 8px', color: '#94a3b8' }}>{r.law}</td>
                  <td style={{ padding: '6px 8px', color: '#94a3b8' }}>{r.mandate}</td>
                  <td style={{ padding: '6px 8px', color: '#94a3b8' }}>{r.board}</td>
                  <td style={{ padding: '6px 8px', color: '#fca5a5' }}>{r.merger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
      <ChartCard title="Governance Gap Matrix" subtitle="Syria vs. international standards">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Dimension', 'Standard', 'Syria', 'Gap'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #1e293b' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {govGaps.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '6px 8px', color: '#e2e8f0', fontWeight: 600 }}>{r.dimension}</td>
                  <td style={{ padding: '6px 8px', color: '#94a3b8' }}>{r.standard}</td>
                  <td style={{ padding: '6px 8px', color: '#fca5a5' }}>{r.syria}</td>
                  <td style={{ padding: '6px 8px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: '#dc262622', color: '#ef4444' }}>{r.gap}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

const DETAIL_COMPONENTS = { H1: H1Detail, H3: H3Detail, H4: H4Detail, H5: H5Detail, H6: H6Detail };

export default function HypothesesTab() {
  const [expanded, setExpanded] = useState('H1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Intro */}
      <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
        This diagnostic is structured around <strong style={{ color: '#e2e8f0' }}>six testable hypotheses</strong> covering
        every dimension of the CAMELS banking assessment framework. Each hypothesis is stated as a finding, then validated
        with quantitative evidence and international benchmarks. All six hypotheses are confirmed — Syria's SOB sector
        fails every dimension of banking soundness.
      </p>

      {/* Summary strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px',
      }}>
        {HYPOTHESES.map(h => (
          <button key={h.id}
            onClick={() => setExpanded(expanded === h.id ? null : h.id)}
            style={{
              padding: '12px', borderRadius: '8px', cursor: 'pointer',
              background: expanded === h.id ? '#1e293b' : '#111827',
              border: expanded === h.id ? '1px solid #3b82f6' : '1px solid #1e293b',
              textAlign: 'center', transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{h.id}</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{h.title}</div>
            <div style={{ marginTop: '6px' }}><VerdictBadge verdict={h.verdict} /></div>
          </button>
        ))}
      </div>

      {/* Expanded hypothesis detail */}
      {HYPOTHESES.map(h => {
        if (expanded !== h.id) return null;
        const DetailComponent = DETAIL_COMPONENTS[h.id];
        return (
          <div key={h.id} style={{
            background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
            border: '1px solid #1e293b', borderRadius: '12px', padding: '24px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#3b82f6' }}>{h.id}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{h.title}</span>
                  <span style={{ fontSize: '10px', color: '#64748b', padding: '2px 8px', background: '#1e293b', borderRadius: '4px' }}>
                    CAMELS: {h.camels}
                  </span>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.5, marginBottom: '12px' }}>
                  "{h.statement}"
                </p>
                <VerdictBadge verdict={h.verdict} />
              </div>
            </div>

            {/* Summary */}
            <div style={{
              marginTop: '16px', padding: '12px 16px', borderRadius: '8px',
              background: '#0a0e17', border: '1px solid #1e293b',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Assessment Summary</div>
              <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>{h.summary}</p>
            </div>

            {/* Evidence */}
            <EvidenceList items={h.evidence} />

            {/* Benchmark chart */}
            {h.benchmarks && (
              <BenchmarkChart
                data={h.benchmarks}
                title={h.id === 'H1' ? 'Equity / Assets: Syria vs. Peers (%)' :
                       h.id === 'H2' ? 'NPL Ratio Comparison (%)' :
                       h.id === 'H3' ? 'ROA Comparison (%)' :
                       h.id === 'H4' ? 'Deposits / Liabilities by Bank (%)' :
                       'Benchmark Comparison'}
              />
            )}

            {/* Hypothesis-specific detail charts */}
            {DetailComponent && <DetailComponent />}
          </div>
        );
      })}
    </div>
  );
}
