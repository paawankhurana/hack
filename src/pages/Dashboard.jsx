import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, TrendingUp, Award, Calendar, Leaf, Zap, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('month')

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

  const leaderboard = [
    { rank: 1, name: 'EcoWarrior23', emissions: 156, badge: '🏆' },
    { rank: 2, name: 'GreenGuru', emissions: 189, badge: '🥈' },
    { rank: 3, name: 'SustainableSam', emissions: 203, badge: '🥉' },
    { rank: 4, name: 'You', emissions: 218, badge: '🌱' },
    { rank: 5, name: 'ClimateChamp', emissions: 234, badge: '♻️' }
  ]

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
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You'
                        ? 'bg-leaf-green text-white'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{user.badge}</span>
                      <div>
                        <span className="font-semibold text-sm">{user.name}</span>
                        <div className="text-xs opacity-75">
                          {user.emissions} kg CO₂ saved
                        </div>
                      </div>
                    </div>
                    <span className="font-bold">#{user.rank}</span>
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
      </div>
    </div>
  )
}

export default Dashboard