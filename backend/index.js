const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let retirementHistory = [
  {
    id: 'r1',
    date: '2025-07-03',
    credits: 30,
    proof: 'emission_proof.png'
  },
  {
    id: 'r2',
    date: '2025-07-05',
    credits: 25,
    proof: 'sensor_log_2.csv'
  }
];

app.post('/api/user/retire', (req, res) => {
  const { credits, proof } = req.body;
  const newEntry = {
    id: `r${retirementHistory.length + 1}`,
    date: new Date().toISOString().split('T')[0],
    credits,
    proof
  };
  retirementHistory.push(newEntry);
  res.json({ success: true, newEntry });
});

app.get('/api/user/retirements', (req, res) => {
  res.json(retirementHistory);
});

app.get('/api/carbon/marketplace', (req, res) => {
  res.json([
    { id: 'batch1', project: 'EcoTree Solar Farm', amount: 50, price: 2 },
    { id: 'batch2', project: 'Reforest India', amount: 120, price: 1.5 },
    { id: 'batch3', project: 'WindWorks Project', amount: 75, price: 2.2 }
  ]);
});

app.get('/api/user/credits', (req, res) => {
  res.json({ balance: 120 });
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const data = {
    batch1: {
      id: 'batch1',
      project: 'EcoTree Solar Farm',
      description: '100-acre solar installation powering 25,000 homes.',
      creditsMinted: 100,
      creditsSold: 50,
      creditsRetired: 30,
      price: 2,
      proofFile: 'ecotree_audit.csv',
      smartContract: 'function transferCredit(from, to, amount) { /* ... */ }'
    },
    batch2: {
      id: 'batch2',
      project: 'Reforest India',
      description: '1 million trees planted across 5 Indian states.',
      creditsMinted: 200,
      creditsSold: 120,
      creditsRetired: 90,
      price: 1.5,
      proofFile: 'reforest_audit.csv',
      smartContract: 'function retireCredit(account, amount) { /* ... */ }'
    },
    batch3: {
      id: 'batch3',
      project: 'WindWorks Project',
      description: 'Offshore wind farm generating clean energy.',
      creditsMinted: 150,
      creditsSold: 75,
      creditsRetired: 60,
      price: 2.2,
      proofFile: 'windworks_audit.csv',
      smartContract: 'function buyWindCredit(account, amount) { /* ... */ }'
    }
  };
  res.json(data[id] || {});
});

app.post('/api/mint', express.json(), (req, res) => {
  const { project, sector, emissions, description, proofFile } = req.body;

  if (!project || !sector || !emissions || emissions <= 0 || !proofFile) {
    return res.status(400).json({ success: false, message: "Missing or invalid fields" });
  }

  const estimatedCredits = Math.floor(emissions / 1000); // 1 credit per 1000 kg CO₂

  res.json({
    success: true,
    mintedCredits: estimatedCredits,
    projectId: project.toLowerCase().replace(/\s/g, '-') + Date.now(),
    sector,
    description,
    contractSnippet: `mintCredit("${project}", ${estimatedCredits});`
  });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
}); 