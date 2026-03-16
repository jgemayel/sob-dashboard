// ─── Syrian State-Owned Banks — Full Diagnostic Dataset ───

export const YEARS = [2022, 2023, 2024];

export const BANK_COLORS = {
  CBS: '#3b82f6',
  ACB: '#10b981',
  REB: '#f59e0b',
  PCB: '#8b5cf6',
  SB:  '#ec4899',
  IB:  '#06b6d4',
};

export const BANK_NAMES = {
  CBS: 'Commercial Bank of Syria',
  ACB: 'Agricultural Co-op Bank',
  REB: 'Real Estate Bank',
  PCB: 'Popular Credit Bank',
  SB:  'Saving Bank',
  IB:  'Industrial Bank',
};

export const BANK_PROFILES = {
  CBS: { name: 'Commercial Bank of Syria', abbr: 'CBS', decree: 'Decree 35/2006', capital: 70, capitalYear: 2010, servicePoints: 141, branches: 73, offices: 68, damascus: '32+18=50' },
  ACB: { name: 'Agricultural Co-op Bank', abbr: 'ACB', decree: 'Law 3/1969', capital: 40, capitalYear: 2011, servicePoints: 111, branches: 106, offices: 5, keyRegions: 'Aleppo: 17, Hasakeh: 17' },
  REB: { name: 'Real Estate Bank', abbr: 'REB', decree: 'Decree 28/1966', capital: 10, capitalYear: 'pre-2011', servicePoints: 45, branches: 22, offices: 23 },
  PCB: { name: 'Popular Credit Bank', abbr: 'PCB', decree: 'Decree 108/1966', capital: 10, capitalYear: 2009, servicePoints: 60, branches: 59, offices: 1 },
  SB:  { name: 'Saving Bank', abbr: 'SB', decree: 'Decree 29/1975', capital: 10, capitalYear: 2010, servicePoints: 59, branches: 14, offices: 45 },
  IB:  { name: 'Industrial Bank', abbr: 'IB', decree: 'Decree 28/1959', capital: 14, capitalYear: 2021, servicePoints: 22, branches: 17, offices: 5 },
};

// Balance Sheet (SYP Billions) — index 0=2022, 1=2023, 2=2024
export const BALANCE_SHEET = {
  CBS: { assets: [23235, 73027, 97222], deposits: [8695, 26807, 35520], equity: [4189, 18692, 20047], credit: [2809, 8618, 23021], liabilities: [19046, 54335, 77174], fxReserve: [3993, 18328, 19643], paidUpCapital: 70 },
  ACB: { assets: [3191, 5862, 10999], deposits: [330, 455, 717], equity: [76, 139, 209], loans: [2329, 4492, 8517], cbsBorrowing: [2559, 4790, 9442], liabilities: [3115, 5722, 10790], paidUpCapital: 40 },
  REB: { assets: [1041, 2358, 2788], deposits: [735, 1427, 1863], equity: [64, 152, 136], credit: [164, 517, 617], liabilities: [976, 2206, 2652], paidUpCapital: 10 },
  PCB: { assets: [361, 579, 909], deposits: [321, 482, 706], equity: [8, 22, 31], credit: [199, 341, 477], liabilities: [352, 558, 879], paidUpCapital: 10 },
  SB:  { assets: [385, 552, 591], deposits: [316, 405, 431], equity: [33, 64, 75], credit: [171, 283, 333], liabilities: [352, 488, 516], paidUpCapital: 10 },
  IB:  { assets: [189, 287, 459], deposits: [153, 237, 380], equity: [19, 24, 34], credit: [58, 79, 121], liabilities: [170, 264, 425], paidUpCapital: 14, npls: [27.7, 21.0, 13.7], grossLoans: [42.7, 67.1, 115.2] },
};

// Income Statement (SYP Billions)
export const INCOME_STATEMENT = {
  CBS: { interestIncome: [83.0, 226.2, 428.9], interestExpense: [57.8, 106.3, 153.5], nii: [25.2, 119.9, 275.4], netProfit: [29.9, 131.9, 92.5] },
  ACB: { interestIncome: [46.3, 93.1, 193.4], nii: [28.5, 59.3, 127.2], netProfit: [38.3, 80.9, 138.2] },
  REB: { interestIncome: [27.9, 51.7, 69.8], nii: [19.0, 41.1, 58.3], netProfit: [18.6, 35.0, 12.8] },
  PCB: { interestIncome: [17.8, 33.6, 49.9], nii: [8.9, 19.8, 33.8], netProfit: [8.7, 15.4, 21.3] },
  SB:  { interestIncome: [22.3, 39.4, 46.7], nii: [3.0, 14.2, 22.5], netProfit: [6.9, 5.7, 14.3] },
  IB:  { interestIncome: [7.5, 11.9, 19.1], nii: [6.2, 10.1, 16.9], netProfit: [3.5, 6.6, 9.9] },
};

// Prudential Ratios (%)
export const RATIOS = {
  roa:             { CBS: [0.13, 0.18, 0.10], REB: [1.79, 1.49, 0.46], IB: [1.87, 2.30, 2.17], ACB: [1.20, 1.38, 1.26], PCB: [2.40, 2.66, 2.34], SB: [1.79, 1.03, 2.43] },
  roe:             { CBS: [0.71, 0.71, 0.46], REB: [28.87, 23.09, 9.44], IB: [18.31, 27.73, 29.45], ACB: [50.56, 58.21, 66.08], PCB: [103.16, 71.44, 69.56], SB: [21.04, 8.85, 19.20] },
  nim:             { CBS: [0.11, 0.16, 0.28], REB: [1.82, 1.74, 2.09], IB: [3.29, 3.53, 3.69], ACB: [0.89, 1.01, 1.16], PCB: [2.45, 3.41, 3.71], SB: [0.79, 2.57, 3.82] },
  costIncome:      { CBS: [6.3, 0.5, 25.9], REB: [78.0, 60.5, 50.8], IB: [51.2, 50.4, 51.8], ACB: [17.5, 9.4, 11.5], PCB: [36.2, 26.4, 30.9], SB: [38.0, 40.1, 37.5] },
  equityAssets:    { CBS: [18.0, 25.6, 20.6], REB: [6.2, 6.4, 4.9], IB: [10.2, 8.3, 7.4], ACB: [2.4, 2.4, 1.9], PCB: [2.3, 3.7, 3.4], SB: [8.5, 11.6, 12.7] },
  leverage:        { CBS: [5.5, 3.9, 4.8], REB: [16.2, 15.5, 20.6], IB: [9.8, 12.1, 13.6], ACB: [42.2, 42.1, 52.6], PCB: [42.9, 26.9, 29.7], SB: [11.8, 8.6, 7.9] },
  depositsLiab:    { CBS: [45.7, 49.3, 46.0], REB: [75.3, 64.7, 70.2], IB: [90.3, 89.8, 89.3], ACB: [10.6, 7.9, 6.6], PCB: [91.0, 86.4, 80.4], SB: [89.6, 83.2, 83.5] },
  npl:             { IB: [65.1, 31.4, 11.9], ACB: [1.3, 0.8, 0.7] },
};

// Sector Totals
export const SECTOR_TOTALS = {
  assets:    [28402, 82665, 112967],
  deposits:  [10120, 30253, 39617],
  equity:    [4895, 19580, 20531],
  netProfit: [105.8, 275.6, 289.0],
  nii:       [90.8, 264.4, 534.1],
  paidUpCapital: 154,
};

// Branch Network
export const BRANCH_NETWORK = {
  CBS: { branches: 73, offices: 68, total: 141 },
  ACB: { branches: 106, offices: 5, total: 111 },
  PCB: { branches: 59, offices: 1, total: 60 },
  SB:  { branches: 14, offices: 45, total: 59 },
  REB: { branches: 22, offices: 23, total: 45 },
  IB:  { branches: 17, offices: 5, total: 22 },
};

// Qualitative Data
export const QUALITATIVE = {
  coreBanking: { CBS: 'Expired 6-7 years', REB: 'Has CBS', IB: 'Integrated Banking Program', ACB: 'Has CBS', PCB: 'Has CBS', SB: 'Testing phase' },
  sanctions:   { CBS: 'SEVERE', REB: 'SEVERE', IB: 'MINIMAL', ACB: 'INDIRECT', PCB: 'INDIRECT', SB: 'MODERATE' },
  sanctionsDetail: {
    CBS: 'SWIFT off, assets frozen, Visa/MC blocked',
    REB: 'Funds frozen, SWIFT off',
    IB:  'Minimal impact',
    ACB: 'Indirect impact',
    PCB: 'Indirect impact',
    SB:  'Moderate impact',
  },
  capitalIncrease: { CBS: false, ACB: false, REB: false, PCB: false, SB: false, IB: true },
};

// CAMELS
export const CAMELS = {
  capital:     { CBS: 'FAIL(adj)', ACB: 'FAIL', REB: 'FAIL', PCB: 'FAIL', SB: 'MARGINAL', IB: 'MARGINAL' },
  assets:      { CBS: 'UNKNOWN', ACB: 'LOW_RISK', REB: 'UNKNOWN', PCB: 'UNKNOWN', SB: 'UNKNOWN', IB: 'IMPAIRED' },
  management:  { CBS: 'WEAK', ACB: 'WEAK', REB: 'WEAK', PCB: 'WEAK', SB: 'WEAK', IB: 'WEAK' },
  earnings:    { CBS: 'FRAGILE', ACB: 'LEVERAGE', REB: 'DECLINING', PCB: 'LEVERAGE', SB: 'RECOVERING', IB: 'STRONG' },
  liquidity:   { CBS: 'ADEQUATE', ACB: 'CBS_DEPENDENT', REB: 'ADEQUATE', PCB: 'ADEQUATE', SB: 'ADEQUATE', IB: 'ADEQUATE' },
  sensitivity: { CBS: 'EXTREME', ACB: 'INDIRECT', REB: 'HIGH', PCB: 'MODERATE', SB: 'MODERATE', IB: 'LOW' },
};

// International Benchmarks
export const BENCHMARKS = {
  baselIII:  { cet1: 4.5, totalCapital: 8, leverage: 3 },
  egyptSOBs: { car: 14 },
  jordanHB:  { car: 16 },
  moroccoSOBs: { car: 13 },
  menaAvg:   { npl: [7, 10], roa: [1, 2], nim: [2.5, 4] },
};

// ─── Helper: Format SYP values ───
export function fmtSYP(val) {
  if (val === null || val === undefined) return '—';
  if (Math.abs(val) >= 1000) return `SYP ${(val / 1000).toFixed(1)}T`;
  return `SYP ${val.toFixed(1)}B`;
}

export function fmtB(val) {
  if (val === null || val === undefined) return '—';
  if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}T`;
  return `${val.toFixed(1)}B`;
}

export function fmtNum(val) {
  if (val === null || val === undefined) return '—';
  return val.toLocaleString();
}

export function fmtPct(val) {
  if (val === null || val === undefined) return '—';
  return `${val.toFixed(2)}%`;
}

export const BANK_IDS = ['CBS', 'ACB', 'REB', 'PCB', 'SB', 'IB'];
