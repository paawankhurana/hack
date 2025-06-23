import React from 'react'
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

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consumer" element={<Consumer />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/carbon-estimator" element={<CarbonEstimator />} />
          <Route path="/greenbot" element={<GreenBot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App