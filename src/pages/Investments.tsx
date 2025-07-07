import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Investment {
  id: string;
  title: string;
  description: string;
  type: string;
  bondsAvailable: number;
  bondPrice: number;
  estimatedROI: number;
}

const MOCK_INVESTMENTS: Investment[] = [
  {
    id: "inv1",
    title: "GreenSolar India",
    description: "10MW solar plant powering 25,000 homes in Rajasthan.",
    type: "Solar Bonds",
    bondsAvailable: 5000,
    bondPrice: 100,
    estimatedROI: 8.5
  },
  {
    id: "inv2",
    title: "Reforest Kerala",
    description: "Afforestation drive restoring 2,000 hectares of native forest.",
    type: "Reforestation Bonds",
    bondsAvailable: 3000,
    bondPrice: 75,
    estimatedROI: 10.2
  },
  {
    id: "inv3",
    title: "WindWorks Gujarat",
    description: "12 wind turbines providing renewable energy for industry.",
    type: "Wind Energy Bonds",
    bondsAvailable: 4200,
    bondPrice: 90,
    estimatedROI: 7.8
  },
  {
    id: "inv4",
    title: "Clean Rivers Mission",
    description: "Wastewater treatment plants across 3 Indian rivers.",
    type: "Water Sanitation Bonds",
    bondsAvailable: 2500,
    bondPrice: 80,
    estimatedROI: 9.1
  },
  {
    id: "inv5",
    title: "BioFuel Farms Punjab",
    description: "Biofuel from agri-waste across 1,000 farms.",
    type: "BioEnergy Bonds",
    bondsAvailable: 4000,
    bondPrice: 110,
    estimatedROI: 11.0
  },
  {
    id: "inv6",
    title: "EV Charging Grid",
    description: "Nationwide rollout of 500 EV charging stations.",
    type: "Clean Transportation Bonds",
    bondsAvailable: 3500,
    bondPrice: 95,
    estimatedROI: 10.0
  },
  {
    id: "inv7",
    title: "Ocean Cleanup Goa",
    description: "Marine plastic cleanup across Goa coastline.",
    type: "Marine Conservation Bonds",
    bondsAvailable: 2200,
    bondPrice: 85,
    estimatedROI: 9.7
  },
  {
    id: "inv8",
    title: "AgriSmart Maharashtra",
    description: "Smart irrigation and solar pumps for 600 villages.",
    type: "AgriTech Bonds",
    bondsAvailable: 4800,
    bondPrice: 70,
    estimatedROI: 8.9
  },
  {
    id: "inv9",
    title: "HydroGreen Sikkim",
    description: "Small hydro projects for rural electrification.",
    type: "Hydro Bonds",
    bondsAvailable: 1900,
    bondPrice: 130,
    estimatedROI: 7.2
  },
  {
    id: "inv10",
    title: "Smart Waste Bengaluru",
    description: "Smart bins and recycling infrastructure upgrade.",
    type: "Recycling Bonds",
    bondsAvailable: 3000,
    bondPrice: 100,
    estimatedROI: 9.0
  }
];

const typeColors: Record<string, string> = {
  'Solar Bonds': 'bg-yellow-100 text-yellow-800',
  'Reforestation Bonds': 'bg-green-100 text-green-800',
  'Wind Energy Bonds': 'bg-blue-100 text-blue-800',
  'Water Sanitation Bonds': 'bg-cyan-100 text-cyan-800',
  'BioEnergy Bonds': 'bg-orange-100 text-orange-800',
  'Clean Transportation Bonds': 'bg-purple-100 text-purple-800',
  'Marine Conservation Bonds': 'bg-teal-100 text-teal-800',
  'AgriTech Bonds': 'bg-lime-100 text-lime-800',
  'Hydro Bonds': 'bg-sky-100 text-sky-800',
  'Recycling Bonds': 'bg-gray-100 text-gray-800',
};

const Investments: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetch
    setTimeout(() => {
      setInvestments(MOCK_INVESTMENTS);
      setLoading(false);
    }, 900);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Green Bond Investment Opportunities</h1>
      {loading ? (
        <div className="text-center text-lg">Loading investments…</div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-200 border border-gray-100 hover:border-leaf-green"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[inv.type] || 'bg-gray-100 text-gray-800'}`}>{inv.type}</span>
                <span className="text-sm font-bold text-leaf-green">${inv.bondPrice} per bond</span>
              </div>
              <h2 className="text-xl font-bold mb-1 text-gray-900">{inv.title}</h2>
              <p className="text-gray-600 mb-3 line-clamp-2">{inv.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-xs bg-gray-50 rounded px-2 py-1">Bonds Available: <b>{inv.bondsAvailable}</b></span>
                <span className="text-xs bg-green-50 rounded px-2 py-1 text-green-700 font-semibold">Expected ROI: {inv.estimatedROI}%</span>
              </div>
              <Link
                to={`/investments/${inv.id}`}
                className="mt-auto btn-green w-full py-2 rounded-lg text-center font-semibold hover:scale-105 transition-transform"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Investments; 