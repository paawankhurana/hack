import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, TrendingUp, Shield, Truck, Coins, FileCheck, ArrowRight, CheckCircle } from 'lucide-react'

const Industry = () => {
  const features = [
    {
      icon: <Coins className="h-12 w-12" />,
      title: "Carbon Credit Pricing Engine",
      description: "Real-time carbon credit pricing with market analysis, certification tracking, and automated trading recommendations.",
      benefits: ["Live market data", "Price predictions", "Automated alerts", "Portfolio management"]
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "ESG Compliance Agent",
      description: "AI-powered compliance checking that automatically reviews your ESG reports against current regulations and standards.",
      benefits: ["Automated compliance checks", "Regulation updates", "Risk assessment", "Audit preparation"]
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Supply Chain Emissions",
      description: "Comprehensive Scope 3 emissions tracking across your entire supply chain with real-time monitoring and optimization.",
      benefits: ["End-to-end tracking", "Supplier scorecards", "Optimization insights", "Risk mitigation"]
    },
    {
      icon: <FileCheck className="h-12 w-12" />,
      title: "Blockchain Validated Offsets",
      description: "Transparent, blockchain-verified carbon offset transactions with smart contract automation and impact verification.",
      benefits: ["Immutable records", "Smart contracts", "Impact verification", "Fraud prevention"]
    }
  ]

  const stats = [
    { number: "500+", label: "Enterprise Clients" },
    { number: "12M", label: "Tons CO₂ Tracked" },
    { number: "99.9%", label: "Compliance Rate" },
    { number: "$2.5B", label: "Carbon Credits Traded" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              For Enterprises & <span className="text-leaf-green">Manufacturers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive ESG compliance, carbon credit management, and supply chain emissions tracking 
              for forward-thinking businesses ready to lead in sustainability.
            </p>
            <div className="flex justify-center">
              <Link to="/admin" className="btn-primary inline-flex items-center text-lg">
                Access Enterprise Portal
                <Building2 className="ml-2 h-6 w-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-leaf-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Sustainability Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed for businesses serious about their environmental impact and regulatory compliance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card hover:scale-105 group"
              >
                <div className="bg-leaf-green text-white p-4 rounded-lg inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-leaf-green mr-3 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Credit Pricing Demo */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Live Carbon Credit Market
            </h2>
            <p className="text-xl text-gray-600">
              Real-time pricing and market intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Market Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">VCS Credits</span>
                  <span className="font-bold text-leaf-green">$12.45/tCO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gold Standard</span>
                  <span className="font-bold text-leaf-green">$18.20/tCO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">CDM Credits</span>
                  <span className="font-bold text-leaf-green">$8.90/tCO₂</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nature-Based</span>
                  <span className="font-bold text-leaf-green">$25.60/tCO₂</span>
                </div>
              </div>
            </div>

            {/* Trending Projects */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Trending Projects</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-leaf-green pl-4">
                  <h4 className="font-semibold">Amazon Rainforest Protection</h4>
                  <p className="text-sm text-gray-600">Brazil • REDD+ • $22.10/tCO₂</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Solar Farm Development</h4>
                  <p className="text-sm text-gray-600">India • Renewable Energy • $15.80/tCO₂</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Mangrove Restoration</h4>
                  <p className="text-sm text-gray-600">Indonesia • Blue Carbon • $28.40/tCO₂</p>
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Your Portfolio</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-leaf-green">2,450</div>
                  <div className="text-gray-600">Total Credits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$42,180</div>
                  <div className="text-gray-600">Portfolio Value</div>
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12.5% this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain Visualization */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supply Chain Emissions Tracking
            </h2>
            <p className="text-xl text-gray-600">
              Visualize and optimize your entire supply chain carbon footprint
            </p>
          </div>

          <div className="card max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {/* Supply Chain Steps */}
              {[
                { step: "Raw Materials", emissions: "2.4 tCO₂", color: "bg-red-500" },
                { step: "Manufacturing", emissions: "5.8 tCO₂", color: "bg-orange-500" },
                { step: "Transportation", emissions: "1.2 tCO₂", color: "bg-yellow-500" },
                { step: "Distribution", emissions: "0.8 tCO₂", color: "bg-leaf-green" },
                { step: "End of Life", emissions: "0.6 tCO₂", color: "bg-blue-500" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                    {index + 1}
                  </div>
                  <h4 className="font-semibold mb-1">{item.step}</h4>
                  <p className="text-sm text-gray-600">{item.emissions}</p>
                  {index < 4 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Total: 10.8 tCO₂e
              </div>
              <p className="text-gray-600">
                15% reduction from last quarter through optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-leaf-green text-white section-padding">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join leading enterprises already using our platform to achieve their sustainability goals and regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin" className="bg-white text-leaf-green hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center">
                Access Enterprise Portal
                <Building2 className="ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-leaf-green font-medium py-3 px-6 rounded-lg transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Industry