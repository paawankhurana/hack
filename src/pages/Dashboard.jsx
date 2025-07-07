import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Award, Calendar, Leaf, Zap, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useLocation } from 'react-router-dom'
import RetirementHistory from './RetirementHistory'
import axios from 'axios'

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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total CO₂ Saved', value: '127 kg', icon: <Leaf className="h-6 w-6" />, color: 'text-leaf-green' },
            { title: 'Current Streak', value: '12 days', icon: <Zap className="h-6 w-6" />, color: 'text-orange-500' },
            { title: 'Leaderboard Rank', value: '#4', icon: <Trophy className="h-6 w-6" />, color: 'text-purple-500' },
            { title: 'Achievements', value: '3/6', icon: <Award className="h-6 w-6" />, color: 'text-blue-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card text-center"
            >
              <div className={`${stat.color} mb-2`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
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

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Target className="h-5 w-5 text-leaf-green mr-2" />
                Personalized Recommendations
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-leaf-green transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <span className="text-leaf-green font-bold">{rec.impact}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded">{rec.category}</span>
                      <span className={`px-2 py-1 rounded ${
                        rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rec.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Award className="h-5 w-5 text-leaf-green mr-2" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.earned
                        ? 'border-leaf-green bg-light-mint'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="font-semibold text-sm">{achievement.title}</h3>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Users className="h-5 w-5 text-leaf-green mr-2" />
                Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboardData.map((user, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You'
                        ? 'bg-leaf-green text-white'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{user.name}</span>
                      <div>
                        <div className="text-xs opacity-75">
                          {user.credits} kg CO₂ saved
                        </div>
                      </div>
                    </div>
                    <span className="font-bold">#{idx + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="card"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Calendar className="h-5 w-5 text-leaf-green mr-2" />
                Weekly Goal
              </h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-leaf-green mb-2">68%</div>
                <div className="text-sm text-gray-600 mb-4">
                  Reduce emissions by 15 kg CO₂
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div className="bg-leaf-green h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <div className="text-xs text-gray-500">
                  4.8 kg remaining • 2 days left
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="retire-section flex items-center gap-4 mt-8">
          <div className="w-full mb-6 bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Connected Wallet</div>
            <div className="font-mono text-base mb-2">{walletAddress || 'Not connected'}</div>
            <div className="text-lg font-semibold">CRBX Balance: <span className="text-leaf-green">{balance}</span></div>
          </div>
          <div className="w-full flex flex-col items-center mb-4">
            <input
              type="number"
              placeholder="Credits to retire"
              value={retireAmount}
              min={1}
              max={balance}
              onChange={e => setRetireAmount(e.target.value)}
              className="border-2 border-leaf-green rounded-lg px-4 py-3 text-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-leaf-green"
              disabled={isRetiring || isVerifying || verificationPass !== null}
            />
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

        {/* Verification Modals */}
        {isVerifying && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex items-center gap-2">
              <span className="animate-spin mr-2">🔍</span> Verifying with AI/Auditor…
            </div>
          </div>
        )}
        {verificationPass === false && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex flex-col items-center">
              ❌ Verification Failed. Please submit clearer proof.
              <button onClick={() => { setVerificationPass(null); setEstimatedCredits(null); }} className="btn-green mt-6">Retry</button>
            </div>
          </div>
        )}
        {verificationPass && estimatedCredits && !confirmEstimate && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex flex-col items-center text-center">
              ✅ AI Verification Passed<br />
              📈 Based on the data, you need to retire <b>{estimatedCredits}</b> credits.<br /><br />
              <button onClick={() => setConfirmEstimate(true)} className="btn-green mb-2">Agree & Retire</button>
              <button onClick={() => { setVerificationPass(null); setEstimatedCredits(null); }} className="btn-secondary">Cancel</button>
            </div>
          </div>
        )}
        {isRetiring && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex items-center gap-2">
              <span className="animate-spin mr-2">🔄</span> Retiring credits…
            </div>
          </div>
        )}
        {retireSuccess && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex flex-col items-center">
              ✅ Successfully retired {retireAmount} credits!
              <button onClick={() => setRetireSuccess(false)} className="btn-green mt-6">Close</button>
            </div>
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="leaderboard-section mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full mx-auto">
          <h3 className="text-2xl font-bold mb-4 flex items-center">�� Top Retirers</h3>
          <table className="min-w-full text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Credits Retired</th>
                <th className="py-2 px-4">Wallet</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, idx) => (
                <tr key={idx} className={user.name === 'You' ? 'bg-leaf-green text-white font-bold' : 'border-t'}>
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.credits}</td>
                  <td className="py-2 px-4 font-mono">{user.wallet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RetirementHistory refetchRef={historyRef} />
      </div>
    </div>
  )
}

export default Dashboard