import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Calculator, Lightbulb, ArrowRight, Camera, MapPin, Package } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CarbonEstimator = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: '',
    origin: '',
    destination: '',
    image: null
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const categories = [
    'Electronics', 'Clothing & Fashion', 'Food & Beverages', 'Home & Garden',
    'Beauty & Personal Care', 'Sports & Outdoors', 'Books & Media', 'Automotive'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  const calculateEmissions = async () => {
    setLoading(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock results based on form data
    const baseEmission = Math.random() * 50 + 10
    const shippingEmission = Math.random() * 20 + 5
    const packagingEmission = Math.random() * 5 + 1
    
    const mockResults = {
      totalEmissions: (baseEmission + shippingEmission + packagingEmission).toFixed(2),
      breakdown: [
        { name: 'Manufacturing', value: baseEmission.toFixed(2), color: '#ef4444' },
        { name: 'Shipping', value: shippingEmission.toFixed(2), color: '#f97316' },
        { name: 'Packaging', value: packagingEmission.toFixed(2), color: '#eab308' }
      ],
      comparison: [
        { name: 'Your Product', emissions: baseEmission + shippingEmission + packagingEmission },
        { name: 'Category Average', emissions: (baseEmission + shippingEmission + packagingEmission) * 1.3 },
        { name: 'Best Alternative', emissions: (baseEmission + shippingEmission + packagingEmission) * 0.6 }
      ],
      alternatives: [
        {
          name: 'Eco-Friendly Alternative #1',
          brand: 'GreenBrand',
          reduction: '40%',
          price: '+$12',
          features: ['Recycled materials', 'Carbon neutral shipping', 'Biodegradable packaging']
        },
        {
          name: 'Sustainable Option #2',
          brand: 'EcoChoice',
          reduction: '35%',
          price: '+$8',
          features: ['Renewable energy production', 'Local sourcing', 'Minimal packaging']
        }
      ]
    }
    
    setResults(mockResults)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-mint to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Carbon <span className="text-leaf-green">Estimator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant CO₂ estimates for any product using our advanced AI technology. 
            Simply enter product details or upload an image for analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Package className="h-6 w-6 text-leaf-green mr-2" />
              Product Information
            </h2>

            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 15 Pro"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Apple"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Shipping Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="e.g., China"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., USA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="h-4 w-4 inline mr-1" />
                  Product Image (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-leaf-green transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload an image for AI-powered analysis
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="btn-secondary cursor-pointer inline-block"
                  >
                    Choose File
                  </label>
                  {formData.image && (
                    <p className="text-sm text-leaf-green mt-2">
                      {formData.image.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateEmissions}
                disabled={loading || !formData.productName}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Calculate Carbon Footprint
                  </div>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {results ? (
              <>
                {/* Total Emissions */}
                <div className="card text-center">
                  <h3 className="text-2xl font-bold mb-4">Carbon Footprint</h3>
                  <div className="text-5xl font-bold text-leaf-green mb-2">
                    {results.totalEmissions}
                  </div>
                  <div className="text-gray-600">kg CO₂ equivalent</div>
                </div>

                {/* Emissions Breakdown */}
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Emissions Breakdown</h3>
                  <div className="space-y-3">
                    {results.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value} kg CO₂</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison Chart */}
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Comparison</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={results.comparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="emissions" fill="#38b000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Eco-Friendly Alternatives */}
                <div className="card">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 text-leaf-green mr-2" />
                    Eco-Friendly Alternatives
                  </h3>
                  <div className="space-y-4">
                    {results.alternatives.map((alt, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{alt.name}</h4>
                            <p className="text-sm text-gray-600">{alt.brand}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-leaf-green font-bold">-{alt.reduction}</div>
                            <div className="text-sm text-gray-600">{alt.price}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {alt.features.map((feature, idx) => (
                            <span key={idx} className="bg-light-mint text-leaf-green text-xs px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="card text-center py-12">
                <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-500">
                  Fill in the product information and click calculate to see your carbon footprint analysis.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CarbonEstimator