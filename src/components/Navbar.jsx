import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'

const Navbar = ({ walletAddress, tokenBalance, connectWallet, isConnecting }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'For Consumers', path: '/consumer' },
    { name: 'For Industries', path: '/industry' },
    { name: 'Carbon Estimator', path: '/carbon-estimator' },
    { name: 'GreenBot', path: '/greenbot' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Invest', path: '/investments' },
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-leaf-green p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">EcoTech</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 ml-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-leaf-green border-b-2 border-leaf-green pb-1'
                  : 'text-gray-600 hover:text-leaf-green'
              } ${item.name === 'Invest' ? 'ml-2 mr-2' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Link to="/admin" className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700 transition">Admin Portal</Link>
          {walletAddress && !isConnecting && (
            <button className="bg-gray-100 text-sm px-2 py-1 rounded font-mono text-gray-700 max-w-[120px] truncate" title={walletAddress}>
              {walletAddress}
            </button>
          )}
          {walletAddress && !isConnecting && (
            <span className="text-green-600 font-bold text-sm">CRBX: {tokenBalance}</span>
          )}
          {!walletAddress && !isConnecting && (
            <button onClick={connectWallet} className="btn-green ml-2">Connect Wallet</button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden ml-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-leaf-green"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Connecting Modal */}
        {isConnecting && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-lg shadow text-xl font-semibold flex items-center gap-2">
              <span className="animate-spin mr-2">🔄</span> Connecting to MetaMask...
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-leaf-green'
                    : 'text-gray-600 hover:text-leaf-green'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-leaf-green"
            >
              Admin Portal
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar