import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Consumer from './pages/Consumer'
import Industry from './pages/Industry'
import CarbonEstimator from './pages/CarbonEstimator'
import GreenBot from './pages/GreenBot'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import CarbonMarketplace from './pages/CarbonMarketplace'
import CompanyMint from './pages/CompanyMint'

function App() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setWalletAddress('0xAbC123...789XyZ')
      fetch('http://localhost:5001/api/user/credits')
        .then(res => res.json())
        .then(data => setTokenBalance(data.balance))
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        walletAddress={walletAddress}
        tokenBalance={tokenBalance}
        connectWallet={connectWallet}
        isConnecting={isConnecting}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consumer" element={<Consumer />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/carbon-estimator" element={<CarbonEstimator />} />
          <Route path="/greenbot" element={<GreenBot />} />
          <Route path="/dashboard" element={<Dashboard walletAddress={walletAddress} balance={tokenBalance} setNavbarBalance={setTokenBalance} />} />
          <Route path="/marketplace" element={<CarbonMarketplace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/company/mint" element={<CompanyMint />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App