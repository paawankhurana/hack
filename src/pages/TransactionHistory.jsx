import React, { useEffect, useState } from 'react';
import axios from 'axios';

const explorerBase = 'https://mumbai.polygonscan.com/tx/';

export default function TransactionHistory() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/user/transactions')
      .then(res => setTxs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="transaction-history min-h-[200px]">
      <h3 className="text-xl font-bold mb-4">🧾 My Transactions</h3>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left group relative cursor-pointer">
                Explorer
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">🔍 Explorer</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {txs.map((tx, i) => (
              <tr key={tx.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 font-mono">{tx.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${tx.type === 'Buy' ? 'bg-green-100 text-green-700' : tx.type === 'Retire' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{tx.type}</span>
                </td>
                <td className="px-4 py-2">{tx.projectName}</td>
                <td className="px-4 py-2">{tx.amount}</td>
                <td className="px-4 py-2 group relative cursor-pointer">
                  <a
                    href={`${explorerBase}${tx.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-leaf-green underline hover:text-green-700"
                  >
                    View
                  </a>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">🔍 Explorer</span>
                </td>
              </tr>
            ))}
            {txs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-8">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 