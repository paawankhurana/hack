import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import Certificate from './Certificate';

const MOCK_INVESTMENTS = [
  {
    id: "inv1",
    title: "GreenSolar India",
    description: "10MW solar plant powering 25,000 homes in Rajasthan.",
    type: "Solar Bonds",
    bondsAvailable: 5000,
    bondPrice: 100,
    estimatedROI: 8.5,
    minimumInvestment: 500,
    duration: "5 years",
    location: "Rajasthan, India",
    impact: "Reduces 1,200 tons of CO₂ annually.",
    status: "Open",
    issuer: "SunPower Renewables Ltd.",
    certification: "Certified by Clean Energy Bureau",
    startDate: "07-2024",
    maturityDate: "07-2029",
    emissionCommitment: 1200,
    useOfFunds: [
      "Install new solar panels",
      "Grid infrastructure upgrade",
      "Community training programs"
    ],
    riskLevel: "Low",
    bondDistribution: { retail: 60, institutional: 40 }
  },
  {
    id: "inv2",
    title: "Reforest Kerala",
    description: "Afforestation drive restoring 2,000 hectares of native forest.",
    type: "Reforestation Bonds",
    bondsAvailable: 3000,
    bondPrice: 75,
    estimatedROI: 10.2,
    minimumInvestment: 400,
    duration: "6 years",
    location: "Kerala, India",
    impact: "Restores biodiversity and sequesters 900 tons of CO₂ annually.",
    status: "Open",
    issuer: "Kerala Green Trust",
    certification: "Certified by Forest Stewardship Council",
    startDate: "09-2024",
    maturityDate: "09-2030",
    emissionCommitment: 900,
    useOfFunds: [
      "Sapling purchase",
      "Farmer incentives",
      "Monitoring tech"
    ],
    riskLevel: "Medium",
    bondDistribution: { retail: 45, institutional: 55 }
  },
  {
    id: "inv3",
    title: "WindWorks Gujarat",
    description: "12 wind turbines providing renewable energy for industry.",
    type: "Wind Energy Bonds",
    bondsAvailable: 4200,
    bondPrice: 90,
    estimatedROI: 7.8,
    minimumInvestment: 450,
    duration: "5 years",
    location: "Gujarat, India",
    impact: "Generates 30 GWh clean energy per year.",
    status: "Open",
    issuer: "Gujarat Wind Corp.",
    certification: "Certified by Indian Wind Energy Association",
    startDate: "06-2024",
    maturityDate: "06-2029",
    emissionCommitment: 1100,
    useOfFunds: [
      "Turbine installation",
      "Grid connection",
      "Maintenance reserve"
    ],
    riskLevel: "Low",
    bondDistribution: { retail: 50, institutional: 50 }
  },
  {
    id: "inv4",
    title: "Clean Rivers Mission",
    description: "Wastewater treatment plants across 3 Indian rivers.",
    type: "Water Sanitation Bonds",
    bondsAvailable: 2500,
    bondPrice: 80,
    estimatedROI: 9.1,
    minimumInvestment: 350,
    duration: "4 years",
    location: "Ganga, Yamuna, Godavari",
    impact: "Improves water quality for 2M people.",
    status: "Closed",
    issuer: "India Water Foundation",
    certification: "Certified by Water Quality Board",
    startDate: "01-2023",
    maturityDate: "01-2027",
    emissionCommitment: 700,
    useOfFunds: [
      "Plant construction",
      "Water testing",
      "Community outreach"
    ],
    riskLevel: "Medium",
    bondDistribution: { retail: 40, institutional: 60 }
  },
  {
    id: "inv5",
    title: "BioFuel Farms Punjab",
    description: "A first-of-its-kind decentralized biofuel network powered by agricultural waste from over 1,000 farms. This project enables local farmers to earn from stubble waste while producing clean energy.",
    type: "BioEnergy Bonds",
    bondsAvailable: 4000,
    bondPrice: 110,
    estimatedROI: 11.0,
    minimumInvestment: 550,
    duration: "4 years",
    location: "Punjab, India",
    impact: "Reduces 850 tons of CO₂ annually and saves 1.2M liters of fossil fuel usage.",
    status: "Open",
    issuer: "Punjab BioFuels Pvt Ltd.",
    certification: "Certified by Indian Bioenergy Council",
    startDate: "08-2024",
    maturityDate: "08-2028",
    emissionCommitment: 850,
    useOfFunds: [
      "Farmer training",
      "Biofuel plant setup",
      "Logistics and transport"
    ],
    riskLevel: "Low",
    bondDistribution: { retail: 55, institutional: 45 }
  },
  {
    id: "inv6",
    title: "EV Charging Grid",
    description: "Nationwide rollout of 500 EV charging stations.",
    type: "Clean Transportation Bonds",
    bondsAvailable: 3500,
    bondPrice: 95,
    estimatedROI: 10.0,
    minimumInvestment: 500,
    duration: "5 years",
    location: "Pan-India",
    impact: "Enables 50,000 EVs to charge daily.",
    status: "Open",
    issuer: "ChargeNet India",
    certification: "Certified by Electric Mobility Board",
    startDate: "10-2024",
    maturityDate: "10-2029",
    emissionCommitment: 1000,
    useOfFunds: [
      "Station installation",
      "Grid upgrades",
      "User app development"
    ],
    riskLevel: "Medium",
    bondDistribution: { retail: 60, institutional: 40 }
  },
  {
    id: "inv7",
    title: "Ocean Cleanup Goa",
    description: "Marine plastic cleanup across Goa coastline.",
    type: "Marine Conservation Bonds",
    bondsAvailable: 2200,
    bondPrice: 85,
    estimatedROI: 9.7,
    minimumInvestment: 400,
    duration: "3 years",
    location: "Goa, India",
    impact: "Removes 200 tons of plastic waste annually.",
    status: "Open",
    issuer: "Goa Marine Foundation",
    certification: "Certified by Ocean Conservancy",
    startDate: "05-2024",
    maturityDate: "05-2027",
    emissionCommitment: 200,
    useOfFunds: [
      "Cleanup equipment",
      "Volunteer training",
      "Awareness campaigns"
    ],
    riskLevel: "High",
    bondDistribution: { retail: 35, institutional: 65 }
  },
  {
    id: "inv8",
    title: "AgriSmart Maharashtra",
    description: "Smart irrigation and solar pumps for 600 villages.",
    type: "AgriTech Bonds",
    bondsAvailable: 4800,
    bondPrice: 70,
    estimatedROI: 8.9,
    minimumInvestment: 350,
    duration: "4 years",
    location: "Maharashtra, India",
    impact: "Saves 10M liters of water per year.",
    status: "Open",
    issuer: "AgriSmart Solutions",
    certification: "Certified by AgriTech India",
    startDate: "11-2024",
    maturityDate: "11-2028",
    emissionCommitment: 600,
    useOfFunds: [
      "Solar pump purchase",
      "Farmer workshops",
      "IoT sensor deployment"
    ],
    riskLevel: "Low",
    bondDistribution: { retail: 70, institutional: 30 }
  },
  {
    id: "inv9",
    title: "HydroGreen Sikkim",
    description: "Small hydro projects for rural electrification.",
    type: "Hydro Bonds",
    bondsAvailable: 1900,
    bondPrice: 130,
    estimatedROI: 7.2,
    minimumInvestment: 600,
    duration: "6 years",
    location: "Sikkim, India",
    impact: "Provides power to 50 remote villages.",
    status: "Open",
    issuer: "Sikkim Hydro Power Ltd.",
    certification: "Certified by Hydro Energy Board",
    startDate: "03-2024",
    maturityDate: "03-2030",
    emissionCommitment: 900,
    useOfFunds: [
      "Turbine purchase",
      "Site surveys",
      "Community engagement"
    ],
    riskLevel: "Medium",
    bondDistribution: { retail: 50, institutional: 50 }
  },
  {
    id: "inv10",
    title: "Smart Waste Bengaluru",
    description: "Smart bins and recycling infrastructure upgrade.",
    type: "Recycling Bonds",
    bondsAvailable: 3000,
    bondPrice: 100,
    estimatedROI: 9.0,
    minimumInvestment: 400,
    duration: "5 years",
    location: "Bengaluru, India",
    impact: "Diverts 5,000 tons of waste from landfills annually.",
    status: "Open",
    issuer: "Bengaluru Clean City Initiative",
    certification: "Certified by Indian Recycling Council",
    startDate: "12-2024",
    maturityDate: "12-2029",
    emissionCommitment: 700,
    useOfFunds: [
      "Smart bin deployment",
      "Recycling plant upgrade",
      "Public education"
    ],
    riskLevel: "Low",
    bondDistribution: { retail: 60, institutional: 40 }
  }
];

const typeColors = {
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

const riskColors = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-red-100 text-red-800',
};

const InvestmentDetails = ({ walletAddress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [buying, setBuying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = MOCK_INVESTMENTS.find((inv) => inv.id === id);
      setInvestment(found || null);
      setLoading(false);
    }, 600);
  }, [id]);

  useEffect(() => {
    // Clean up blob URL on unmount
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);

  const handleBuyBonds = async () => {
    setError(null);
    if (!walletAddress) {
      setError('Please connect your wallet to purchase.');
      return;
    }
    if (!quantity || quantity < 1 || quantity > investment.bondsAvailable) {
      setError('Enter a valid quantity.');
      inputRef.current?.focus();
      return;
    }
    setBuying(true);
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      const date = new Date().toLocaleDateString();
      const details = {
        project: investment.title,
        investor: walletAddress,
        quantity,
        price: investment.bondPrice,
        date,
      };
      setPurchaseDetails(details);
      // Generate PDF blob using recommended pattern
      const doc = <Certificate {...details} />;
      const asPdf = pdf([]);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
      // Simulate email send
      await new Promise((res) => setTimeout(res, 600));
      setShowSuccessModal(true);
    } catch (e) {
      setError('Purchase failed. Please try again.');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading investment details…</div>;
  }
  if (!investment) {
    return <div className="text-center py-12 text-red-500">Investment not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <button
        className="mb-6 text-leaf-green font-semibold hover:underline flex items-center gap-1"
        onClick={() => navigate(-1)}
      >
        ← Back to Investments
      </button>
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[investment.type] || 'bg-gray-100 text-gray-800'}`}>{investment.type}</span>
          <span className="text-xs bg-gray-50 rounded px-2 py-1">{investment.duration}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskColors[investment.riskLevel] || 'bg-gray-100 text-gray-800'}`} title={
            investment.riskLevel === 'Low' ? 'Low risk: Stable returns, strong guarantees.' :
            investment.riskLevel === 'Medium' ? 'Medium risk: Moderate volatility, some guarantees.' :
            'High risk: Higher returns, less guarantee.'
          }>
            Risk: {investment.riskLevel}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${investment.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{investment.status}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{investment.title}</h1>
        <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-2">
          <span>Issuer: <b>{investment.issuer}</b></span>
          <span className="text-xs bg-blue-50 rounded px-2 py-1">{investment.certification}</span>
        </div>
        <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-2">
          <span>Start: <b>{investment.startDate}</b></span>
          <span>Maturity: <b>{investment.maturityDate}</b></span>
        </div>
        <div className="text-gray-600 mb-2">{investment.location}</div>
        <p className="text-gray-700 mb-3 whitespace-pre-line">{investment.description}</p>
        {/* Key Stats Section */}
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="text-xs bg-gray-50 rounded px-2 py-1">Bonds Available: <b>{investment.bondsAvailable}</b></span>
          <span className="text-xs bg-green-50 rounded px-2 py-1 text-green-700 font-semibold">Expected ROI: {investment.estimatedROI}%</span>
          <span className="text-xs bg-blue-50 rounded px-2 py-1 text-blue-700 font-semibold">Price: ${investment.bondPrice}</span>
          {investment.minimumInvestment && (
            <span className="text-xs bg-orange-50 rounded px-2 py-1 text-orange-700 font-semibold">Min. Investment: ${investment.minimumInvestment}</span>
          )}
          <span className="text-xs bg-emerald-50 rounded px-2 py-1 text-emerald-700 font-semibold">CO₂ Commitment: {investment.emissionCommitment} tons</span>
        </div>
        {/* Use of Funds Section */}
        <div className="mb-2">
          <div className="font-semibold text-gray-800 mb-1">Use of Funds</div>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {investment.useOfFunds.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Bond Distribution Section */}
        <div className="mb-2">
          <div className="font-semibold text-gray-800 mb-1">Bond Distribution</div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-gray-100 rounded px-2 py-1">Retail: <b>{investment.bondDistribution.retail}%</b></span>
            <span className="text-xs bg-gray-200 rounded px-2 py-1">Institutional: <b>{investment.bondDistribution.institutional}%</b></span>
          </div>
        </div>
        {/* Environmental Impact Section */}
        {investment.impact && (
          <div className="bg-green-50 border-l-4 border-leaf-green p-4 rounded mb-2">
            <div className="font-semibold text-leaf-green mb-1">🌱 Environmental Impact</div>
            <div className="text-gray-700 text-sm">{investment.impact}</div>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold text-gray-700">Bonds to Purchase</label>
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={investment.bondsAvailable}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="border rounded px-3 py-2 w-32"
            disabled={buying}
          />
          <div className="text-sm text-gray-500">Available: {investment.bondsAvailable}</div>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <button
          className="btn-green w-full py-3 text-lg font-bold rounded-lg mt-2"
          onClick={handleBuyBonds}
          disabled={buying || !walletAddress}
        >
          {buying ? 'Processing…' : 'Buy Bonds'}
        </button>
        {!walletAddress && <div className="text-orange-500 text-sm mt-2">Connect your wallet to purchase.</div>}
      </div>
      {/* Enhanced Success Modal */}
      {showSuccessModal && purchaseDetails && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col items-center border-2 border-green-200">
            <div className="text-3xl font-bold text-green-700 mb-2 flex items-center gap-2">
              <span>✅</span> Purchase Successful
            </div>
            <div className="mb-4 text-lg text-gray-700 text-center max-w-xl">
              An email has been sent with your signed certificate.<br/>
              Thank you for supporting a sustainable future!
            </div>
            <div className="w-full flex flex-col items-center gap-4 mt-2">
              <a
                href={pdfBlobUrl}
                download={`Certificate_${purchaseDetails.project.replace(/\s/g, '')}_${purchaseDetails.date}.pdf`}
                className="btn-green px-6 py-3 rounded text-white font-semibold text-lg shadow"
              >
                Download Certificate
              </a>
              {pdfBlobUrl && (
                <div className="w-full flex flex-col items-center">
                  <div className="font-semibold text-gray-700 mb-2">Certificate Preview</div>
                  <div style={{ width: '100%', maxWidth: 700, height: 500, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 16px #0001', background: '#f6fff7', border: '1.5px solid #e6f4ea' }}>
                    <iframe
                      src={pdfBlobUrl}
                      title="Certificate Preview"
                      width="100%"
                      height="100%"
                      style={{ border: 'none', minHeight: 500 }}
                    />
                  </div>
                </div>
              )}
            </div>
            <button className="btn-green mt-8 px-8 py-3 text-lg rounded" onClick={() => { setShowSuccessModal(false); setQuantity(1); setPurchaseDetails(null); setPdfBlobUrl(null); }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentDetails; 