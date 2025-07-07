import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

const RetirementHistory = forwardRef(({ refetchRef }, ref) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    axios.get('http://localhost:5001/api/user/retirements')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHistory();
    if (refetchRef) refetchRef.current = fetchHistory;
  }, []);

  useImperativeHandle(ref, () => fetchHistory);

  return (
    <div className="retirement-history min-h-[200px] bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full mx-auto">
      <h3 className="text-2xl font-bold mb-4 flex items-center">🗂️ My Retirement History</h3>
      <table className="min-w-full text-left border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Credits Retired</th>
            <th className="py-2 px-4 group relative cursor-pointer">
              Proof File
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">📄 Proof</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4">{item.date}</td>
              <td className="py-2 px-4">{item.credits}</td>
              <td className="py-2 px-4 font-mono group relative cursor-pointer">
                {item.proof}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">📄 Proof</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default RetirementHistory; 