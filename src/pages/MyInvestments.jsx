import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#38b000', '#f9c846', '#ef4444', '#6366f1', '#22c55e', '#eab308'];

const currency = (amt) => Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt);

export default function MyInvestments() {
  const [holdings, setHoldings] = useState([]);
  const [totalBonds, setTotalBonds] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [weightedROI, setWeightedROI] = useState(0);
  const [sortBy, setSortBy] = useState('roi');

  useEffect(() => {
    axios.get('http://localhost:5001/api/user/investments')
      .then(res => setHoldings(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!holdings.length) return;
    const bonds = holdings.reduce((sum, h) => sum + h.bondsOwned, 0);
    const value = holdings.reduce((sum, h) => sum + h.bondsOwned * h.bondPrice, 0);
    const weighted = value === 0 ? 0 : holdings.reduce((sum, h) => sum + (h.bondsOwned * h.bondPrice * h.roi), 0) / value;
    setTotalBonds(bonds);
    setTotalValue(value);
    setWeightedROI(weighted);
  }, [holdings]);

  const sorted = [...holdings].sort((a, b) => sortBy === 'roi' ? b.roi - a.roi : b.bondsOwned * b.bondPrice - a.bondsOwned * a.bondPrice);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">📈 My Investments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-sm mb-1">Total Bonds Owned</div>
          <div className="text-2xl font-bold text-leaf-green">{totalBonds}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-sm mb-1">Total Value Invested</div>
          <div className="text-2xl font-bold text-blue-700">{currency(totalValue)}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="text-gray-500 text-sm mb-1">Weighted Avg. ROI</div>
          <div className="text-2xl font-bold text-orange-600">{weightedROI.toFixed(2)}%</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Table */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Holdings</h2>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded px-2 py-1 text-sm">
              <option value="roi">Sort by ROI</option>
              <option value="value">Sort by Value</option>
            </select>
          </div>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Bonds Owned</th>
                  <th className="px-4 py-2 text-left">Value</th>
                  <th className="px-4 py-2 text-left">ROI</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((h, i) => (
                  <tr key={h.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 font-semibold">{h.projectName}</td>
                    <td className="px-4 py-2">{h.bondsOwned}</td>
                    <td className="px-4 py-2">{currency(h.bondsOwned * h.bondPrice)}</td>
                    <td className="px-4 py-2 text-orange-700 font-bold">{h.roi}%</td>
                  </tr>
                ))}
                {holdings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-8">No investments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-2">Portfolio Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={holdings.map(h => ({ name: h.projectName, value: h.bondsOwned * h.bondPrice }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name }) => name}
              >
                {holdings.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={currency} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 