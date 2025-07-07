import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Award, Calendar, Leaf, Zap, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useLocation } from 'react-router-dom'
import RetirementHistory from './RetirementHistory'
import axios from 'axios'
import TransactionHistory from './TransactionHistory'
import MyInvestments from './MyInvestments'

const Dashboard = ({ walletAddress, balance, setNavbarBalance }) => {
  const [timeframe, setTimeframe] = useState('month')
  const [retireAmount, setRetireAmount] = useState("")
  const [isRetiring, setIsRetiring] = useState(false)
  const [retireSuccess, setRetireSuccess] = useState(false)
  const [error, setError] = useState("")
  const [uploadFile, setUploadFile] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationPass, setVerificationPass] = useState(null) // null | true | false
  const [estimatedCredits, setEstimatedCredits] = useState(null)
  const [confirmEstimate, setConfirmEstimate] = useState(false)
  const historyRef = useRef(null)

  // Mock data
  const emissionsData = [
    { name: 'Jan', emissions: 45, saved: 12 },
    { name: 'Feb', emissions: 38, saved: 18 },
    { name: 'Mar', emissions: 42, saved: 15 },
    { name: 'Apr', emissions: 35, saved: 22 },
    { name: 'May', emissions: 28, saved: 28 },
    { name: 'Jun', emissions: 25, saved: 32 }
  ]

  const categoryData = [
    { name: 'Transportation', value: 35, color: '#ef4444' },
    { name: 'Energy', value: 28, color: '#f97316' },
    { name: 'Food', value: 20, color: '#eab308' },
    { name: 'Shopping', value: 12, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6366f1' }
  ]

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first carbon assessment', icon: '🌱', earned: true },
    { id: 2, title: 'Week Warrior', description: 'Reduced emissions for 7 consecutive days', icon: '⚡', earned: true },
    { id: 3, title: 'Green Shopper', description: 'Chose eco-friendly alternatives 10 times', icon: '🛍️', earned: true },
    { id: 4, title: 'Carbon Crusher', description: 'Reduced monthly emissions by 25%', icon: '💪', earned: false },
    { id: 5, title: 'Eco Influencer', description: 'Shared 5 sustainability tips', icon: '📢', earned: false },
    { id: 6, title: 'Planet Protector', description: 'Offset 1 ton of CO₂', icon: '🌍', earned: false }
  ]

  // Leaderboard mock data
  const leaderboardData = [
    { name: "GreenGuru", credits: 450, wallet: "0x123...4Abc" },
    { name: "CarbonCrusher", credits: 390, wallet: "0x5d6...EfG9" },
    { name: "SustainableSam", credits: 322, wallet: "0xAb9...8888" },
    { name: "You", credits: balance, wallet: walletAddress || "0xAbC123...789XyZ" },
    { name: "ClimateChamp", credits: 289, wallet: "0x999...Fa12" },
  ];

  const recommendations = [
    {
      title: 'Switch to LED Bulbs',
      impact: '12 kg CO₂/month',
      difficulty: 'Easy',
      category: 'Energy'
    },
    {
      title: 'Use Public Transport',
      impact: '45 kg CO₂/month',
      difficulty: 'Medium',
      category: 'Transportation'
    },
    {
      title: 'Reduce Meat Consumption',
      impact: '28 kg CO₂/month',
      difficulty: 'Medium',
      category: 'Food'
    }
  ]

  const handleVerify = () => {
    if (!uploadFile) {
      setError("Please upload proof first.")
      return
    }
    setError("")
    setIsVerifying(true)
    setTimeout(() => {
      const passed = Math.random() > 0.1 // 90% pass
      setIsVerifying(false)
      setVerificationPass(passed)
      if (passed) {
        // simulate AI estimation
        const estimate = Math.floor(Math.random() * 40) + 10 // 10–50 credits
        setEstimatedCredits(estimate)
      }
    }, 2000)
  }

  const handleRetire = async (amt) => {
    const amount = Number(amt ?? retireAmount)
    setError("")
    if (!amount || amount <= 0 || amount > balance) {
      setError("Please enter a valid amount to retire.")
      return
    }
    setIsRetiring(true)
    try {
      const res = await axios.post('http://localhost:5001/api/user/retire', {
        credits: amount,
        proof: uploadFile?.name || 'manual_entry.png'
      })
      if (res.data.success) {
        setNavbarBalance(prev => prev - amount)
        setIsRetiring(false)
        setRetireSuccess(true)
        setRetireAmount("")
        setUploadFile(null)
        setVerificationPass(null)
        if (historyRef.current) historyRef.current()
      }
    } catch (err) {
      setIsRetiring(false)
      setError("❌ Failed to retire credits.")
    }
  }

  useEffect(() => {
    if (confirmEstimate && estimatedCredits) {
      setRetireAmount(estimatedCredits)
      handleRetire(estimatedCredits)
      setConfirmEstimate(false)
      setEstimatedCredits(null)
    }
  }, [confirmEstimate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-mint to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Sustainability <span className="text-leaf-green">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Track your environmental impact and celebrate your green achievements
          </p>
        </motion.div>

        {/* Main Content: Charts + Retire Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-10">
          {/* Charts (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emissions Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Emissions Trend</h2>
                <div className="flex space-x-2">
                  {['week', 'month', 'year'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeframe(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        timeframe === period
                          ? 'bg-leaf-green text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="emissions" stroke="#ef4444" strokeWidth={2} name="Emissions (kg CO₂)" />
                  <Line type="monotone" dataKey="saved" stroke="#38b000" strokeWidth={2} name="Saved (kg CO₂)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Category Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-bold mb-6">Emissions by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Retire Section (1/3 width, right, slightly above) */}
          <div className="space-y-8 sticky top-24 self-start">
            <div className="retire-section bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Connected Wallet</div>
              <div className="font-mono text-base mb-2">{walletAddress || 'Not connected'}</div>
              <div className="text-lg font-semibold mb-4">CRBX Balance: <span className="text-leaf-green">{balance}</span></div>
              {/* Upload Section */}
              <div className="upload-section w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Emission Proof:
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={e => setUploadFile(e.target.files[0])}
                    className="block mt-1"
                    disabled={isRetiring || isVerifying || verificationPass === true}
                  />
                </label>
                {uploadFile && <div className="text-xs text-gray-500 mt-1">Selected: {uploadFile.name}</div>}
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <button
                onClick={handleVerify}
                className="btn-green w-full py-3 text-lg font-bold rounded-lg mt-2"
                disabled={isVerifying || isRetiring || verificationPass === true}
              >
                Verify Proof
              </button>
              <button
                onClick={() => handleRetire()}
                className="btn-green w-full py-3 text-lg font-bold rounded-lg mt-2"
                disabled={isRetiring || verificationPass !== true}
              >
                Retire Credits
              </button>
            </div>
          </div>
        </div>

        {/* Full-width History Sections */}
        <section className="px-4 py-6 shadow-md rounded-2xl bg-white">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <MyInvestments />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="min-h-[200px] card flex flex-col">
                <RetirementHistory ref={historyRef} />
              </div>
              <div className="min-h-[200px] card flex flex-col">
                <TransactionHistory />
              </div>
            </div>
          </div>
        </section>

       
      </div>
    </div>
  )
}

export default Dashboard