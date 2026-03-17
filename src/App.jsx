import { useState } from 'react';
import LoginGate from './components/LoginGate';
import Sidebar from './components/Sidebar';
import ExecutiveTab from './components/ExecutiveTab';
import FinancialTab from './components/FinancialTab';
import RatiosTab from './components/RatiosTab';
import DeepDiveTab from './components/DeepDiveTab';
import BenchmarkingTab from './components/BenchmarkingTab';
import BranchesTab from './components/BranchesTab';
import ConcentrationTab from './components/ConcentrationTab';
import HypothesesTab from './components/HypothesesTab';

const TAB_TITLES = {
  executive: 'Executive Dashboard',
  hypotheses: 'Diagnostic Hypotheses',
  financial: 'Financial Analysis',
  ratios: 'Prudential Ratios',
  deepdive: 'Bank Deep Dive',
  benchmarking: 'International Benchmarks',
  branches: 'Branch Network',
  concentration: 'Concentration Risk',
};

const TAB_DESCRIPTIONS = {
  executive: 'Consolidated sector overview with key performance indicators, concentration analysis, and CAMELS diagnostic scorecard.',
  hypotheses: 'Six hypothesis-driven findings across the CAMELS framework — each stated as a claim, then validated with data and international benchmarks.',
  financial: 'Three-year balance sheet and income statement analysis across all 6 state-owned banks.',
  ratios: 'Prudential ratios with MENA peer benchmarks and Basel III reference lines.',
  deepdive: 'Individual bank profiles with full financial data, qualitative assessments, and CAMELS ratings.',
  benchmarking: 'Gap analysis against Basel III, MENA SOB peers, and international standards.',
  branches: 'Branch and office network distribution across 14 Syrian governorates.',
  concentration: 'Market concentration analysis — HHI, CBS dominance, ACB funding dependency, equity composition.',
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('executive');

  if (!authenticated) {
    return <LoginGate onAuth={() => setAuthenticated(true)} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'executive': return <ExecutiveTab />;
      case 'hypotheses': return <HypothesesTab />;
      case 'financial': return <FinancialTab />;
      case 'ratios': return <RatiosTab />;
      case 'deepdive': return <DeepDiveTab />;
      case 'benchmarking': return <BenchmarkingTab />;
      case 'branches': return <BranchesTab />;
      case 'concentration': return <ConcentrationTab />;
      default: return <ExecutiveTab />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e17' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', padding: '24px 32px', maxWidth: 'calc(100vw - 240px)' }}>
        {/* Header */}
        <header style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>{TAB_TITLES[activeTab]}</h1>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{TAB_DESCRIPTIONS[activeTab]}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '24px' }}>
            <div style={{ fontSize: '10px', color: '#475569' }}>Data: 2022-2024 &middot; All amounts in SYP Billions</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>6 State-Owned Banks &middot; 438 Service Points &middot; 90/90 validations passed</div>
          </div>
        </header>

        {/* Tab content */}
        {renderTab()}

        {/* Footer */}
        <footer style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #1e293b', textAlign: 'center', fontSize: '10px', color: '#475569' }}>
          SOB Diagnostic Dashboard &middot; Syria Central Bank Reform Project &middot; Confidential
        </footer>
      </main>
    </div>
  );
}
