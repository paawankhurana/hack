import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarbonMarketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBuying, setIsBuying] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/carbon/marketplace')
      .then(res => {
        setListings(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleBuy = (batch) => {
    setSelectedBatch(batch);
    setIsBuying(true);
    setTimeout(() => {
      setListings(prev =>
        prev.map(item =>
          item.id === batch.id
            ? { ...item, amount: item.amount - batch.amount }
            : item
        )
      );
      setIsBuying(false);
      setTxSuccess(true);
    }, 1500);
  };

  const handleRowClick = async (projectId) => {
    setProjectLoading(true);
    setSelectedProject(null);
    try {
      const res = await axios.get(`http://localhost:5001/api/projects/${projectId}`);
      console.log('Project details:', res.data);
      setSelectedProject(res.data);
    } catch (err) {
      setSelectedProject({ project: 'Error', description: 'Failed to load project details.' });
    } finally {
      setProjectLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Carbon Credit Marketplace</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Project</th>
                <th className="py-3 px-4 text-left">Credits Available</th>
                <th className="py-3 px-4 text-left">Price (MATIC)</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id} className="border-t cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(item.id)}>
                  <td className="py-3 px-4">{item.project}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">
                    <button
                      className="btn-primary buy-btn"
                      onClick={e => { e.stopPropagation(); handleBuy(item); }}
                      disabled={isBuying || item.amount <= 0}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for processing transaction */}
      {isBuying && !projectLoading && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold">Processing transaction…</div>
        </div>
      )}
      {/* Modal for transaction success */}
      {txSuccess && selectedBatch && !projectLoading && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex flex-col items-center">
            <div>✅ Purchase Successful! You bought {selectedBatch.amount} credits.</div>
            <button
              className="btn-primary mt-6"
              onClick={() => setTxSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Project Details Modal */}
      {(projectLoading || (selectedProject && selectedProject.project)) && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            {projectLoading ? (
              <div className="text-xl font-semibold flex items-center gap-2"><span className="animate-spin">🔄</span> Loading project details…</div>
            ) : selectedProject && selectedProject.project ? (
              <>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.project}</h3>
                <p className="mb-2 text-gray-700">{selectedProject.description}</p>
                <p><b>Minted:</b> {selectedProject.creditsMinted}</p>
                <p><b>Sold:</b> {selectedProject.creditsSold}</p>
                <p><b>Retired:</b> {selectedProject.creditsRetired}</p>
                <p><b>Audit File:</b> {selectedProject.proofFile}</p>
                <pre className="bg-gray-100 rounded p-3 my-3 overflow-x-auto text-sm">
                  <code>{selectedProject.smartContract}</code>
                </pre>
                <button className="btn-primary buy-btn mr-4" onClick={() => alert("Buying logic reused here!")}>Buy @ {selectedProject.price} MATIC</button>
                <button className="btn-secondary" onClick={() => setSelectedProject(null)}>Close</button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonMarketplace; 