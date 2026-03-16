import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import ChartCard from './ChartCard';
import KPICard from './KPICard';
import { BANK_IDS, BANK_COLORS, BRANCH_NETWORK } from '../data/bankData';

export default function BranchesTab() {
  const totalBranches = Object.values(BRANCH_NETWORK).reduce((s, b) => s + b.branches, 0);
  const totalOffices = Object.values(BRANCH_NETWORK).reduce((s, b) => s + b.offices, 0);
  const totalAll = totalBranches + totalOffices;

  const barData = BANK_IDS.map(b => ({
    bank: b,
    Branches: BRANCH_NETWORK[b].branches,
    Offices: BRANCH_NETWORK[b].offices,
    Total: BRANCH_NETWORK[b].total,
  }));

  const pieData = BANK_IDS.map(b => ({
    name: b,
    value: BRANCH_NETWORK[b].total,
  }));

  const branchVsOffice = [
    { name: 'Branches', value: totalBranches },
    { name: 'Offices', value: totalOffices },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total Service Points" value={totalAll} color="#3b82f6" />
        <KPICard label="Branches" value={totalBranches} color="#10b981" sub={`${((totalBranches/totalAll)*100).toFixed(0)}% of total`} />
        <KPICard label="Offices" value={totalOffices} color="#f59e0b" sub={`${((totalOffices/totalAll)*100).toFixed(0)}% of total`} />
        <KPICard label="Largest Network" value="CBS (141)" color="#8b5cf6" sub="32% of all points" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Branches vs Offices by Bank" subtitle="Stacked bar chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="bank" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
              <Tooltip content={({ active, payload, label }) => {
                if (!active || !payload) return null;
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white mb-1">{label}</p>
                    {payload.map((p, i) => <p key={i} className="text-xs" style={{ color: p.color }}>{p.name}: {p.value}</p>)}
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
              <Bar dataKey="Branches" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Offices" stackId="a" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Service Point Distribution" subtitle="Share of total network by bank">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={110}
                dataKey="value" nameKey="name" paddingAngle={2} stroke="none">
                {pieData.map((e, i) => <Cell key={i} fill={BANK_COLORS[e.name]} />)}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0];
                return (
                  <div className="bg-[#1a2332] border border-[#2d3748] rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold text-white">{d.name}: {d.value} points</p>
                    <p className="text-xs text-[#94a3b8]">{((d.value/totalAll)*100).toFixed(1)}%</p>
                  </div>
                );
              }} />
              <Legend formatter={(v) => <span className="text-xs text-[#94a3b8]">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detail Table */}
      <ChartCard title="Branch Network Detail">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 text-[#64748b] font-medium">Bank</th>
                <th className="text-right py-2 px-3 text-[#64748b] font-medium">Branches</th>
                <th className="text-right py-2 px-3 text-[#64748b] font-medium">Offices</th>
                <th className="text-right py-2 px-3 text-[#64748b] font-medium">Total</th>
                <th className="text-right py-2 px-3 text-[#64748b] font-medium">% of Sector</th>
                <th className="text-left py-2 px-3 text-[#64748b] font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BANK_IDS.map(b => {
                const bn = BRANCH_NETWORK[b];
                const notes = {
                  CBS: 'Damascus: 32 branches + 18 offices = 50',
                  ACB: 'Aleppo: 17, Hasakeh: 17',
                  PCB: '', SB: '', REB: '', IB: '',
                };
                return (
                  <tr key={b} className="border-t border-[#1e293b]">
                    <td className="py-2 px-3 font-semibold" style={{ color: BANK_COLORS[b] }}>{b}</td>
                    <td className="py-2 px-3 text-right text-white">{bn.branches}</td>
                    <td className="py-2 px-3 text-right text-white">{bn.offices}</td>
                    <td className="py-2 px-3 text-right text-white font-bold">{bn.total}</td>
                    <td className="py-2 px-3 text-right text-[#94a3b8]">{((bn.total/totalAll)*100).toFixed(1)}%</td>
                    <td className="py-2 px-3 text-[#64748b] text-xs">{notes[b]}</td>
                  </tr>
                );
              })}
              <tr className="border-t-2 border-[#3b82f6]">
                <td className="py-2 px-3 font-bold text-white">TOTAL</td>
                <td className="py-2 px-3 text-right text-white font-bold">{totalBranches}</td>
                <td className="py-2 px-3 text-right text-white font-bold">{totalOffices}</td>
                <td className="py-2 px-3 text-right text-white font-bold">{totalAll}</td>
                <td className="py-2 px-3 text-right text-white font-bold">100%</td>
                <td className="py-2 px-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
