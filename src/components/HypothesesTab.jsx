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
    statement: 'Syria\'s state-owned banks are critically undercapitalized — the adjusted sector equity-to-assets ratio of 0.8% is approximately 10 times below the Basel III minimum floor of 8%, representing the most severe capital deficiency documented in any currently operating banking system.',
    verdict: 'CONFIRMED',
    camels: 'Capital',
    summary: 'The total paid-up capital across all six state-owned banks stands at SYP 154 billion — a figure that has remained entirely unchanged since the period 2009-2011, despite total sector assets growing by 298% to reach SYP 113 trillion. This represents a fundamental disconnect between the scale of banking operations and the capital base supporting them. The situation is further distorted by the Commercial Bank of Syria (CBS), whose reported equity of SYP 20 trillion is composed almost entirely (98%) of unrealized foreign exchange revaluation gains totaling SYP 19.6 trillion. These FX gains are not distributable, cannot be monetized under current sanctions, and would reverse entirely if the Syrian Pound were to appreciate against foreign currencies. When these unrealized gains are excluded, CBS\'s adjusted equity falls to just SYP 404 billion — representing an adjusted equity-to-assets ratio of only 0.4%. Across the broader sector, the adjusted equity-to-assets ratio is approximately 0.8%, which is the lowest ratio documented for any operating banking system globally. By comparison, Iraq\'s state-owned banks — widely regarded as among the weakest in the MENA region following the 2003 conflict — maintained a ratio of approximately 4% during their restructuring period. Egypt\'s state-owned banks currently operate at approximately 14%, and Jordan\'s Housing Bank at 16%. The erosion in real terms is equally stark: SYP 154 billion at the 2010 exchange rate of approximately 45 SYP/USD was equivalent to roughly USD 3.4 billion; at the current rate of approximately 13,000 SYP/USD, the same nominal figure is worth approximately USD 12 million — a 99.6% loss in purchasing power.',
    evidence: [
      'Total paid-up capital across all 6 SOBs: SYP 154 billion — entirely unchanged for more than 14 years despite 298% cumulative asset growth over the 2022-2024 period alone',
      'CBS adjusted equity (excluding unrealized FX revaluation gains): SYP 404 billion, representing just 0.4% of SYP 97.2 trillion in total assets — well below any internationally recognized minimum',
      'ACB equity-to-assets ratio of 1.9% with corresponding leverage of 52.6x, substantially exceeding the Basel III maximum leverage threshold of 33x (derived from the 3% leverage ratio floor)',
      'PCB equity-to-assets ratio of 3.4%, meaning that a loss of merely 3.4% on the bank\'s asset portfolio would completely eliminate all shareholder equity',
      'Only the Industrial Bank (IB) has increased its capital since the onset of the conflict in 2011, doing so in 2021; the remaining four banks (CBS, REB, PCB, SB) have not recapitalized in over a decade',
      'In real purchasing power terms, the SYP 154 billion in aggregate capital was equivalent to approximately USD 3.4 billion at 2010 exchange rates; at 2024 rates, this same nominal figure is worth approximately USD 12 million — representing a 99.6% erosion in real value',
    ],
    benchmarks: [
      { name: 'Syria SOBs (adjusted)', value: 0.8 },
      { name: 'Basel III Minimum', value: 8.0 },
      { name: 'Iraq SOBs (2005)', value: 4.0 },
      { name: 'Egypt SOBs (2023)', value: 14.0 },
      { name: 'Jordan Housing Bank', value: 16.0 },
      { name: 'Morocco SOBs (2023)', value: 13.0 },
    ],
  },
  {
    id: 'H2',
    title: 'Asset Quality Opacity',
    statement: 'The quality of the SOB loan portfolio is either severely impaired or fundamentally unmeasurable due to critical data gaps — either outcome disqualifies these institutions from meeting the minimum standards required of a functioning banking system.',
    verdict: 'CONFIRMED',
    camels: 'Assets',
    summary: 'Non-performing loan (NPL) data is not disclosed in the financial statements of four of the six state-owned banks, collectively representing approximately 90% of total sector assets. This is an extraordinary gap by any international standard — IFRS 7 requires comprehensive credit risk disclosure, Basel Pillar 3 mandates public reporting of asset quality metrics, and every central bank in the MENA region requires at minimum quarterly NPL disclosure from supervised institutions. The Commercial Bank of Syria, which holds 86% of sector assets, does not report NPL ratios in its financial statements. However, CBS management self-reported through the qualitative survey that the bank carries approximately SYP 3.47 trillion in "old" (pre-crisis) non-performing loans against a total loan book of SYP 24.1 trillion, implying a self-reported NPL ratio of approximately 14.4%. Based on post-conflict precedents — Iraq\'s Rasheed and Rafidain banks reported NPL ratios of 50-70% following the 2003 conflict, Lebanese banks reported 30-50% following the 2019 crisis, and Libyan SOBs approximately 35% — the true CBS NPL ratio is likely in the range of 25-40%, which would imply SYP 6-10 trillion in impaired assets, potentially exceeding CBS\'s adjusted equity of SYP 404 billion by a factor of 15 to 25 times. Where data does exist, the picture is mixed: the Industrial Bank (IB) reports an NPL ratio that has improved substantially from 65.1% in 2022 to 11.9% in 2024, though this remains above the MENA regional average of 7-10%. The Agricultural Co-op Bank (ACB) reports an NPL ratio of just 0.7%, which is unusually low for an institution engaged primarily in agricultural lending in a post-conflict environment and may indicate classification practices that differ from international norms. No bank in the sector has implemented IFRS 9 expected credit loss provisioning, and all audits are conducted by a government auditor rather than an independent external firm.',
    evidence: [
      'CBS, holding 86.1% of total sector assets, does not disclose NPL ratios in its published financial statements — the largest data gap in the sector',
      'CBS management survey response: SYP 3.47 trillion in "old" (pre-crisis) non-performing loans against a total loan portfolio of SYP 24.1 trillion, implying a self-reported NPL ratio of approximately 14.4%',
      'Post-conflict NPL benchmarks from comparable situations: Iraq SOBs reported 50-70% NPLs (2003-2005); Lebanese banks reported 30-50% (2020-2022); Libyan SOBs reported approximately 35% (2011-2013)',
      'IB NPL ratio improved from 65.1% in 2022 to 31.4% in 2023 to 11.9% in 2024, driven by a combination of write-offs and new lending growth expanding the denominator — however, the ratio remains above the MENA regional average of 7-10%',
      'ACB reports an NPL ratio of 0.7%, which is unusually low for agricultural lending in a post-conflict environment and may reflect classification methodologies that diverge from international standards, or potential underreporting of impairment',
      'No bank in the sector has adopted IFRS 9, which requires forward-looking expected credit loss provisioning — all banks continue to use incurred loss models that systematically understate credit risk',
      'All six banks are audited exclusively by a government auditor; no independent external audit (such as by a Big 4 firm) has been conducted, limiting the reliability and verifiability of reported asset quality figures',
    ],
    benchmarks: [
      { name: 'ACB (reported)', value: 0.7 },
      { name: 'MENA Average', value: 8.5 },
      { name: 'IB', value: 11.9 },
      { name: 'CBS (self-reported)', value: 14.4 },
      { name: 'CBS (estimated)', value: 30.0 },
      { name: 'Iraq (2005)', value: 60.0 },
    ],
  },
  {
    id: 'H3',
    title: 'Earnings Fragility',
    statement: 'The reported profitability of Syria\'s SOBs is substantially driven by non-recurring foreign exchange accounting effects and unsustainable leverage-based spread arbitrage, rather than by the core commercial banking operations that would indicate a viable long-term business model.',
    verdict: 'CONFIRMED',
    camels: 'Earnings',
    summary: 'At the aggregate level, sector net profit reached SYP 289 billion in 2024, but growth decelerated sharply from +160% in 2023 to just +5% in 2024, revealing the fragility beneath the headline figures. The Commercial Bank of Syria — contributing 32% of sector profit — saw its net profit decline by 30% year-over-year, from SYP 131.9 billion to SYP 92.5 billion. CBS\'s return on assets (ROA) of 0.10% is significantly below every MENA peer benchmark (Egypt SOBs: 1.7%, Jordan Housing Bank: 1.3%, Morocco SOBs: approximately 1.0%). The Agricultural Co-op Bank, which generates the largest share of sector profit (48%), reports a return on equity (ROE) of 66.1%. However, this figure is not a measure of operational efficiency — it is a mechanical consequence of extreme leverage. ACB operates with a leverage ratio of 52.6x (assets-to-equity), meaning its equity base is so thin that even modest interest spreads translate into very high ROEs. ACB\'s business model consists of borrowing SYP 9.4 trillion from CBS at one rate and lending it to agricultural cooperatives at a higher rate — this is spread arbitrage on borrowed money, not deposit-funded commercial banking. Similarly, PCB\'s ROE of 69.6% is driven by leverage of 29.7x rather than superior performance. The Real Estate Bank experienced a 63% collapse in profit (from SYP 35.0 billion to SYP 12.8 billion), driven primarily by SYP 19.8 billion in capital losses. Only the Industrial Bank and the Saving Bank demonstrate sustainable earnings models, with ROAs of 2.17% and 2.43% respectively — both within or above the MENA peer range. Revenue composition is another critical concern: approximately 95% of sector revenue derives from net interest income, compared to a MENA norm of 65-75%. This absence of fee income, commission income, or other non-interest revenue sources leaves the sector entirely dependent on interest rate spreads, with no buffer against margin compression.',
    evidence: [
      'CBS net profit declined 30% year-over-year: SYP 131.9 billion (2023) to SYP 92.5 billion (2024), despite the bank holding 86% of sector assets',
      'CBS return on assets of 0.10% is significantly below all comparable MENA state-owned bank peers: Egypt at 1.7%, Jordan Housing Bank at 1.3%, Morocco at approximately 1.0%',
      'ACB return on equity of 66.1% is driven entirely by 52.6x leverage (assets divided by equity), not by operational efficiency — the same spread on a normally capitalized balance sheet would produce an ROE of approximately 3-5%',
      'ACB borrows SYP 9.4 trillion from CBS wholesale and lends it to agricultural cooperatives at a higher rate, creating a circular funding chain in which both institutions earn spreads on government-intermediated capital flows',
      'REB net profit collapsed by 63%: from SYP 35.0 billion (2023) to SYP 12.8 billion (2024), driven primarily by SYP 19.8 billion in capital losses recognized during the period',
      'Sector-wide cost-to-income ratios ranging from 11.5% (ACB) to 51.8% (IB) are well below the international norm of 50-65%, reflecting systemic wage compression and minimal investment in technology, training, or infrastructure rather than genuine operational efficiency',
      'Revenue composition is approximately 95% net interest income across the sector, compared to the MENA regional norm of 65-75% — indicating a complete absence of meaningful revenue diversification through fees, commissions, trading, or other non-interest income sources',
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
    statement: 'System-wide liquidity is concentrated in a single institution — CBS holds 90% of all deposits and serves as the sole funding source for 87% of ACB\'s liabilities, creating an unmitigated single point of failure with no deposit insurance, no lender-of-last-resort mechanism, and no systemic backstop.',
    verdict: 'CONFIRMED',
    camels: 'Liquidity',
    summary: 'The Commercial Bank of Syria holds SYP 35.5 trillion of the sector\'s SYP 39.6 trillion in total customer deposits — a concentration of 89.7%. This means that any institution-specific stress event affecting CBS (whether operational, reputational, or sanctions-related) would immediately threaten the liquidity of the entire Syrian banking system. The interconnectedness is deepened by the CBS-ACB funding corridor: ACB derives 87.5% of its liabilities from wholesale borrowing from CBS (SYP 9.4 trillion in 2024), with customer deposits accounting for only 6.6% of its funding. This creates a loan-to-deposit ratio of 1,353% — ACB lends approximately 13 times its deposit base, entirely funded by CBS. The resulting circular flow (depositors → CBS → ACB → agricultural cooperatives) channels SYP 9.4 trillion through a single institutional corridor with no diversification, no market-based pricing, and no alternative funding source. Syria has no deposit insurance scheme, no formally constituted lender-of-last-resort mechanism, and no resolution framework for systemically important banks. Post-conflict precedents demonstrate the consequences of this architecture: in Lebanon (2019-2022), the Banque du Liban served as the sole liquidity provider to the banking system, and when BdL\'s own losses were revealed, the entire system collapsed — USD 72 billion in deposits were frozen and the currency lost approximately 98% of its value. In Afghanistan (2021), the SWIFT cutoff of the dominant bank froze the national payment system overnight. Syria\'s CBS already operates under SWIFT disconnection, placing the system in a partial version of this scenario. The remaining five banks (IB, SB, PCB, REB) maintain conventional deposit-funded models with deposits comprising 70-89% of their liabilities, but their collective deposit base of SYP 4.1 trillion is insufficient to serve as a systemic alternative if CBS were to face liquidity stress.',
    evidence: [
      'CBS holds 89.7% of all customer deposits in the SOB sector: SYP 35.5 trillion out of a total SYP 39.6 trillion, creating an extreme concentration that has no parallel in peer banking systems',
      'ACB funding structure: 87.5% of total liabilities sourced from CBS wholesale borrowing (SYP 9.4 trillion), with customer deposits comprising only 6.6% of liabilities (SYP 717 billion)',
      'ACB loan-to-deposit ratio of 1,353%: the bank lends approximately 13 times its customer deposit base, with the entire funding gap covered by a single counterparty (CBS)',
      'The CBS → ACB → cooperatives funding corridor channels SYP 9.4 trillion through a single institutional pathway, with no alternative funding sources, no market-based pricing mechanism, and no stress-tested contingency',
      'Syria has no deposit insurance scheme — depositors have no formal protection in the event of a bank failure or liquidity crisis',
      'No formally constituted lender-of-last-resort mechanism exists — the Central Bank of Syria lacks the operational and legal framework for emergency liquidity assistance',
      'Lebanon (2019-2022): Banque du Liban served as sole systemic liquidity provider; when BdL losses (exceeding 4x GDP) were revealed, the entire banking system collapsed, freezing USD 72 billion in deposits',
      'Afghanistan (2021): SWIFT disconnection of the dominant bank (Da Afghanistan Bank) froze the national payment system overnight, forcing a reversion to cash-based transactions',
    ],
    benchmarks: [
      { name: 'ACB (Deposits/Liabilities)', value: 6.6 },
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
    statement: 'The core banking systems, branch infrastructure, product capabilities, and human capital of Syria\'s SOBs have deteriorated below the minimum threshold required for safe, reliable, and compliant banking operations.',
    verdict: 'CONFIRMED',
    camels: 'Management',
    summary: 'The operational infrastructure of Syria\'s state-owned banks has been degraded by a combination of conflict, sanctions, chronic underinvestment, and the emigration of skilled personnel. The most critical operational risk lies at the Commercial Bank of Syria, which processes transactions for 86% of sector assets on a core banking system that has been without vendor technical support for 6-7 years. This means that no security patches, feature updates, or bug fixes have been available, and any system failure could halt banking operations for millions of customers with no vendor recourse. The Saving Bank\'s core system remains in a pilot and testing phase and has not been fully deployed to production. No bank in the sector offers digital banking, mobile banking, internet banking, or card-based payment services — capabilities that have been considered essential components of basic banking infrastructure internationally since at least 2015. Anti-money laundering and counter-terrorist financing (AML/CFT) processes at all six banks are conducted entirely through manual procedures, with no automated transaction monitoring, suspicious activity detection, or sanctions screening systems in place. CBS\'s SWIFT access has been disconnected due to international sanctions, eliminating the bank\'s ability to process cross-border payments through the global interbank messaging network. Visa and Mastercard networks are similarly blocked, removing any possibility of card-based payment capabilities. The physical branch network has also been affected: branches in multiple conflict-affected governorates — including Raqqa, Idlib, Deir ez-Zor, Abu Kamal, Mayadin, and Jisr al-Shughur — have been destroyed, and the associated client data has been permanently lost in some cases. The human capital dimension is equally concerning: the sector has experienced significant emigration of skilled banking professionals since 2011, particularly in specialized functions such as risk management, information technology, compliance, and audit. Compensation levels for SOB employees are set by government pay scales that are substantially below both private sector banking salaries and regional market benchmarks, making recruitment and retention of qualified staff extremely difficult. No bank operates a centralized data warehouse, business intelligence platform, or automated regulatory reporting system — all reporting is conducted manually using spreadsheet-based processes.',
    evidence: [
      'CBS core banking system has been operating without vendor technical support for 6-7 years — no security patches, feature updates, or maintenance are available, and any critical failure would halt operations for an institution holding 86% of sector assets',
      'SB core banking system remains in a pilot and testing phase and has not been deployed to production across the bank\'s branch network',
      'No bank in the sector offers any form of digital banking channel: no mobile banking application, no internet banking portal, no card-based payments — capabilities considered essential for basic banking infrastructure internationally',
      'AML/CFT screening and transaction monitoring at all six banks is conducted exclusively through manual processes, with no automated detection, flagging, or reporting systems in place',
      'CBS SWIFT connectivity has been disconnected as a result of international sanctions, eliminating the ability to process cross-border payments through the standard global interbank messaging infrastructure',
      'CBS Visa and Mastercard network access has been blocked by sanctions, removing all card-based payment processing and issuance capabilities',
      'Physical branches in multiple conflict-affected governorates have been destroyed, including locations in Raqqa, Idlib, Deir ez-Zor, Abu Kamal, Mayadin, and Jisr al-Shughur — with associated client records permanently lost in several cases',
      'The sector has experienced a significant loss of skilled banking professionals through emigration since 2011, particularly in critical specialized functions including risk management, information technology, regulatory compliance, and internal audit. Compensation levels set by government pay scales are substantially below private sector and regional market rates.',
      'No bank operates a centralized data warehouse, business intelligence platform, or automated regulatory reporting system — all analytical and compliance reporting is produced through manual, spreadsheet-based processes',
    ],
    benchmarks: null,
  },
  {
    id: 'H6',
    title: 'Governance & Regulatory Vacuum',
    statement: 'The legal frameworks, corporate governance structures, and prudential oversight mechanisms governing Syria\'s SOBs fail to meet any recognized international standard — including Basel III capital and liquidity requirements, IFRS accounting standards, FATF anti-money laundering recommendations, and OECD state-owned enterprise governance guidelines.',
    verdict: 'CONFIRMED',
    camels: 'Sensitivity',
    summary: 'Syria\'s six state-owned banks operate under six entirely separate formation laws, enacted across six different decades (1959, 1966, 1966, 1969, 1975, and 2006). Each law establishes a different governance structure, capital framework, profit distribution mechanism, and supervisory arrangement — creating a fragmented regulatory landscape that prevents consolidated oversight and makes structural reform (including mergers) legally complex. Not a single bank in the sector has any independent directors on its board — all board members across all six institutions are appointed by the government. This stands in direct contrast to the Basel Committee on Banking Supervision (BCBS) Corporate Governance Principles, which require a majority of independent directors, and the OECD Guidelines on Corporate Governance of State-Owned Enterprises, which recommend similar independence standards. No bank has established formal audit committees, risk committees, or remuneration committees — all of which are considered mandatory governance structures under international banking supervision standards. The chief risk officer (CRO) function, which the BCBS considers essential for any systemically important bank, is either absent or operates on a minimal and informal basis across the sector. External audits are conducted exclusively by a government auditor; no independent external audit by a recognized international firm has been performed. On the regulatory compliance front, the gaps are comprehensive: Basel III has not been implemented in any form — no risk-weighted asset calculations are performed, no Common Equity Tier 1 (CET1) ratio is computed, and no liquidity coverage ratio (LCR) or net stable funding ratio (NSFR) is measured. IFRS 9, which requires forward-looking expected credit loss provisioning, has not been adopted by any bank. AML/CFT processes are basic and manual, with no alignment to the FATF 40 Recommendations. None of the six formation laws contain provisions for merger or consolidation — creating a legal barrier to any restructuring that would require legislative action. International precedents demonstrate that legal framework unification is typically the essential first step in SOB reform: Egypt passed its Unified Banking Law in 2003, Morocco enacted Banking Law 34-03 in 2006, Vietnam adopted its Unified Credit Institutions Law in 2010, and India has been conducting its SOB mega-merger program since 2017.',
    evidence: [
      'Six separate formation laws governing the sector: Legislative Decree 28/1959 (IB), Legislative Decree 28/1966 (REB), Legislative Decree 108/1966 (PCB), Law 3/1969 (ACB), Legislative Decree 29/1975 (SB), and Legislative Decree 35/2006 (CBS)',
      'Zero independent board directors across all six banks — 100% of board members are government-appointed, in direct contravention of BCBS Corporate Governance Principles requiring majority board independence',
      'No formal audit committee, risk committee, or remuneration committee exists at any of the six banks — all are considered mandatory governance structures under international banking supervision standards',
      'No chief risk officer (CRO) function with board-level reporting authority — risk management across the sector operates on a minimal and informal basis',
      'No independent external audit has been conducted — all six banks are audited exclusively by a government auditor, falling short of the OECD SOE Guidelines recommendation for Big 4 or equivalent independent audit',
      'Basel III framework has not been implemented: no risk-weighted asset calculations, no CET1 ratio computation, no leverage ratio measurement, no liquidity coverage ratio (LCR), no net stable funding ratio (NSFR), and no stress testing',
      'IFRS 9 (Financial Instruments) has not been adopted — all banks continue to use incurred loss models for loan provisioning rather than the forward-looking expected credit loss (ECL) approach required since 2018',
      'AML/CFT procedures remain basic and entirely manual, with no automated transaction monitoring, suspicious activity detection, or sanctions screening systems — falling substantially short of the FATF 40 Recommendations',
      'None of the six formation laws contain any provisions for institutional merger, consolidation, or asset/liability transfer — creating a fundamental legal barrier to any structural restructuring of the sector',
      'International reform precedents: Egypt unified its SOB framework through Banking Law 88/2003; Morocco through Banking Law 34-03 (2006); Vietnam through the Unified Credit Institutions Law (2010); India through its ongoing SOB mega-merger program consolidating 27 banks to 12 (2017-2023)',
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
      <ChartCard title="ROA by Bank (2024)" subtitle="MENA peer range: 1-2% — CBS at 0.10% is significantly below the regional range">
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
    { capability: 'Core Banking System', standard: 'Supported, vendor-maintained', cbs: 'Out of support for 6-7 years', others: 'Operational or in pilot phase', gap: 'CRITICAL' },
    { capability: 'Digital / Mobile Banking', standard: 'Mobile app and internet banking', cbs: 'Not available', others: 'Not available', gap: 'TOTAL' },
    { capability: 'AML/CFT Screening', standard: 'Automated transaction monitoring', cbs: 'Manual processes only', others: 'Manual processes only', gap: 'TOTAL' },
    { capability: 'SWIFT Connectivity', standard: 'Connected for cross-border payments', cbs: 'Disconnected (sanctions)', others: 'Not applicable', gap: 'SEVERE' },
    { capability: 'Card Networks', standard: 'Visa/Mastercard issuance and acquiring', cbs: 'Blocked by sanctions', others: 'Not available', gap: 'TOTAL' },
    { capability: 'Data Warehouse / BI', standard: 'Centralized analytics and reporting', cbs: 'Not available', others: 'Not available', gap: 'TOTAL' },
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
                  <td style={{ padding: '8px 12px', color: r.cbs.includes('Out of support') || r.cbs.includes('Disconnected') || r.cbs.includes('Blocked') ? '#fca5a5' : (r.cbs.includes('Not available') || r.cbs.includes('Manual') ? '#fcd34d' : '#94a3b8'), fontWeight: 600 }}>{r.cbs}</td>
                  <td style={{ padding: '8px 12px', color: r.others.includes('Not available') || r.others.includes('Manual') ? '#fcd34d' : '#94a3b8' }}>{r.others}</td>
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
      <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '12px' }}>
          This diagnostic assessment is structured around <strong style={{ color: '#e2e8f0' }}>six testable hypotheses</strong>,
          each aligned to a dimension of the internationally recognized CAMELS banking supervision framework (Capital adequacy,
          Asset quality, Management capability, Earnings sustainability, Liquidity resilience, and Sensitivity to market risk).
        </p>
        <p style={{ marginBottom: '12px' }}>
          Each hypothesis is stated as a declarative finding rather than an open question. The supporting evidence draws on
          three years of audited financial data (2022-2024), validated through 90 automated checks with zero material discrepancies,
          supplemented by qualitative management surveys, branch-level operational data, and analysis of each bank's formation law.
          International benchmarks are provided from Basel III standards (BCBS), MENA state-owned bank peers (Egypt, Morocco, Jordan),
          and post-conflict banking restructuring precedents (Iraq 2003-2010, Lebanon 2019-present, Libya 2011-2015, Afghanistan 2021).
        </p>
        <p>
          <strong style={{ color: '#fca5a5' }}>All six hypotheses are confirmed.</strong> Syria's state-owned banking sector
          fails every dimension of the CAMELS framework. The gaps identified are not incremental deficiencies amenable to
          targeted remediation — they are foundational and structural, requiring comprehensive reform across capital,
          governance, technology, and institutional architecture.
        </p>
      </div>

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
