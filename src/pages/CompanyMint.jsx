import React, { useState } from 'react';
import axios from 'axios';

const CompanyMint = () => {
  const [form, setForm] = useState({
    project: '',
    sector: '',
    emissions: '',
    description: '',
    proofFile: null
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setResponse(null);
    try {
      const res = await axios.post('http://localhost:5001/api/mint', {
        project: form.project,
        sector: form.sector,
        emissions: parseFloat(form.emissions),
        description: form.description,
        proofFile: form.proofFile?.name
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Minting failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-leaf-green">Mint New Carbon Credits</h2>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input name="project" placeholder="Project Name" onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
          <select name="sector" onChange={handleChange} className="border rounded px-3 py-2 w-full">
            <option value="">Select Sector</option>
            <option value="Energy">Energy</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Transportation">Transportation</option>
            <option value="Forestation">Forestation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
          <textarea name="description" placeholder="Project Description" onChange={handleChange} className="border rounded px-3 py-2 w-full"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emissions Reduced (kg CO₂)</label>
          <input name="emissions" placeholder="Emissions Reduced (kg CO₂)" type="number" onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IoT Proof Upload</label>
          <input name="proofFile" type="file" onChange={handleChange} className="border rounded px-3 py-2 w-full" />
        </div>
        <button onClick={handleSubmit} className="btn-green w-full py-3 text-lg font-bold rounded-lg mt-2">Mint Credits</button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {response && (
          <div className="mt-6 border border-green-400 bg-green-50 rounded p-4">
            <h4 className="text-lg font-bold text-green-700 mb-2">✅ Minting Successful</h4>
            <p><b>Project:</b> {form.project}</p>
            <p><b>Credits Minted:</b> {response.mintedCredits}</p>
            <p><b>Sector:</b> {response.sector}</p>
            <p><b>Smart Contract:</b></p>
            <pre className="bg-gray-100 rounded p-2 text-sm overflow-x-auto"><code>{response.contractSnippet}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyMint; 