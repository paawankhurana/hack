import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Building2, Bot, BarChart3, Leaf, Zap } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Carbon Estimator",
      description: "Get instant CO₂ estimates for any product with our advanced AI technology"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "GreenBot Assistant",
      description: "Your personal sustainability coach powered by artificial intelligence"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Impact Dashboard",
      description: "Track your environmental impact with beautiful, actionable insights"
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Enterprise Solutions",
      description: "Comprehensive ESG compliance and carbon credit management for businesses"
    }
  ]

  const stats = [
    { number: "50K+", label: "CO₂ Estimates Generated" },
    { number: "12M", label: "Tons CO₂ Offset" },
    { number: "500+", label: "Companies Served" },
    { number: "98%", label: "User Satisfaction" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Shop Smart.{' '}
              <span className="text-leaf-green">Live Green.</span>{' '}
              Offset Easily.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your lifestyle and business with AI-powered sustainability insights. 
              Track, reduce, and offset your carbon footprint with precision and ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/carbon-estimator" className="btn-primary inline-flex items-center">
                Estimate Your Carbon Footprint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/greenbot" className="btn-secondary inline-flex items-center">
                Try GreenBot
                <Bot className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <div className="relative mt-16">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-10 left-10 text-4xl"
            >
              🌱
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute top-20 right-20 text-3xl"
            >
              🌍
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-10 left-1/4 text-3xl"
            >
              ♻️
            </motion.div>
          </div>
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
              Powerful Tools for a Sustainable Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to understand, track, and reduce your environmental impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center hover:scale-105"
              >
                <div className="bg-leaf-green text-white p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Segments Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Consumers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-leaf-green mr-3" />
                <h3 className="text-2xl font-bold">For Consumers</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Make informed purchasing decisions with AI-powered carbon estimates, 
                personalized recommendations, and gamified sustainability tracking.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>Instant product carbon footprint analysis</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>AI-powered sustainable alternatives</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>Gamified impact tracking</span>
                </li>
              </ul>
              <Link to="/consumer" className="btn-primary inline-flex items-center">
                Explore Consumer Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <Building2 className="h-8 w-8 text-leaf-green mr-3" />
                <h3 className="text-2xl font-bold">For Industries</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Comprehensive ESG compliance, carbon credit management, and supply chain 
                emissions tracking for forward-thinking businesses.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>Automated ESG compliance checking</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>Real-time carbon credit pricing</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-leaf-green mr-2" />
                  <span>Blockchain-verified offsets</span>
                </li>
              </ul>
              <Link to="/industry" className="btn-primary inline-flex items-center">
                Explore Enterprise Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
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
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of individuals and companies already reducing their carbon footprint with EcoTech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/carbon-estimator" className="bg-white text-leaf-green hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/greenbot" className="border-2 border-white text-white hover:bg-white hover:text-leaf-green font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center">
                Chat with GreenBot
                <Bot className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home