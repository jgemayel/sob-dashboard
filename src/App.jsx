import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExecutiveTab from './components/ExecutiveTab';
import FinancialTab from './components/FinancialTab';
import RatiosTab from './components/RatiosTab';
import DeepDiveTab from './components/DeepDiveTab';
import BenchmarkingTab from './components/BenchmarkingTab';
import BranchesTab from './components/BranchesTab';
import ConcentrationTab from './components/ConcentrationTab';

const TAB_TITLES = {
  executive: 'Executive Dashboard',
  financial: 'Financial Analysis',
  ratios: 'Prudential Ratios',
  deepdive: 'Bank Deep Dive',
  benchmarking: 'International Benchmarks',
  branches: 'Branch Network',
  concentration: 'Concentration Risk',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');

  const renderTab = () => {
    switch (activeTab) {
      case 'executive': return <ExecutiveTab />;
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
    <div className="flex min-h-screen" style={{ background: '#0a0e17' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-56 flex-1 p-6 min-h-screen">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{TAB_TITLES[activeTab]}</h1>
            <p className="text-xs text-[#64748b] mt-0.5">Syrian State-Owned Banks Diagnostic &middot; Data: 2022-2024 &middot; All amounts in SYP Billions unless noted</p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-[#475569]">Last updated: Q4 2024</div>
            <div className="text-[10px] text-[#475569]">6 State-Owned Banks &middot; 438 Service Points</div>
          </div>
        </header>
        {renderTab()}
        <footer className="mt-8 pt-4 border-t border-[#1e293b] text-center text-[10px] text-[#475569]">
          SOB Diagnostic Dashboard &middot; Syria Central Bank Reform Project &middot; Confidential
        </footer>
      </main>
    </div>
  );
}
