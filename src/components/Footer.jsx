import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-leaf-green p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">EcoTech</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering individuals and businesses to make sustainable choices through AI-powered insights and carbon tracking technology.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-leaf-green cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-leaf-green cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-gray-400 hover:text-leaf-green cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/consumer" className="text-gray-400 hover:text-white transition-colors">For Consumers</Link></li>
              <li><Link to="/industry" className="text-gray-400 hover:text-white transition-colors">For Industries</Link></li>
              <li><Link to="/carbon-estimator" className="text-gray-400 hover:text-white transition-colors">Carbon Estimator</Link></li>
              <li><Link to="/greenbot" className="text-gray-400 hover:text-white transition-colors">GreenBot</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>hello@ecotech.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EcoTech. All rights reserved. Built for a sustainable future.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer