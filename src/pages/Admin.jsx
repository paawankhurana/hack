import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertTriangle, Download, Shield, BarChart3, Users, Building2 } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [uploadedFile, setUploadedFile] = useState(null)

  // Mock data
  const complianceData = [
    { category: 'Scope 1 Emissions', status: 'Compliant', score: 95 },
    { category: 'Scope 2 Emissions', status: 'Compliant', score: 88 },
    { category: 'Scope 3 Emissions', status: 'Needs Review', score: 72 },
    { category: 'Water Usage', status: 'Compliant', score: 91 },
    { category: 'Waste Management', status: 'Compliant', score: 85 },
    { category: 'Biodiversity', status: 'Needs Review', score: 68 }
  ]

  const emissionsData = [
    { month: 'Jan', scope1: 120, scope2: 80, scope3: 200 },
    { month: 'Feb', scope1: 115, scope2: 75, scope3: 195 },
    { month: 'Mar', scope1: 110, scope2: 78, scope3: 190 },
    { month: 'Apr', scope1: 105, scope2: 72, scope3: 185 },
    { month: 'May', scope1: 100, scope2: 70, scope3: 180 },
    { month: 'Jun', scope1: 95, scope2: 68, scope3: 175 }
  ]

  const carbonCredits = [
    { project: 'Amazon Rainforest Protection', type: 'REDD+', credits: 1250, price: '$22.10', status: 'Active' },
    { project: 'Solar Farm Development', type: 'Renewable Energy', credits: 800, price: '$15.80', status: 'Active' },
    { project: 'Mangrove Restoration', type: 'Blue Carbon', credits: 600, price: '$28.40', status: 'Pending' },
    { project: 'Wind Energy Project', type: 'Renewable Energy', credits: 950, price: '$18.20', status: 'Active' }
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'compliance', name: 'ESG Compliance', icon: <Shield className="h-4 w-4" /> },
    { id: 'emissions', name: 'Emissions Tracking', icon: <Building2 className="h-4 w-4" /> },
    { id: 'credits', name: 'Carbon Credits', icon: <FileText className="h-4 w-4" /> },
    { id: 'reports', name: 'Reports', icon: <Download className="h-4 w-4" /> }
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
            Enterprise <span className="text-leaf-green">Admin Portal</span>
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive ESG compliance and carbon management dashboard
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-leaf-green text-leaf-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: 'Total Emissions', value: '2,450 tCO₂e', change: '-12%', color: 'text-red-500' },
                  { title: 'Carbon Credits', value: '3,600', change: '+8%', color: 'text-leaf-green' },
                  { title: 'Compliance Score', value: '87%', change: '+5%', color: 'text-blue-500' },
                  { title: 'Cost Savings', value: '$125K', change: '+15%', color: 'text-purple-500' }
                ].map((metric, index) => (
                  <div key={index} className="card text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{metric.title}</div>
                    <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Emissions Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={emissionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="scope1" stroke="#ef4444" name="Scope 1" />
                      <Line type="monotone" dataKey="scope2" stroke="#f97316" name="Scope 2" />
                      <Line type="monotone" dataKey="scope3" stroke="#eab308" name="Scope 3" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Compliance Overview</h3>
                  <div className="space-y-4">
                    {complianceData.slice(0, 4).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.score >= 80 ? 'bg-leaf-green' : 'bg-yellow-500'}`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-8">
              {/* Upload Section */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Upload ESG Report</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-leaf-green transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Upload your ESG report for automated compliance checking
                  </p>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, Excel, and CSV formats
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="esg-upload"
                  />
                  <label
                    htmlFor="esg-upload"
                    className="btn-primary cursor-pointer inline-block"
                  >
                    Choose File
                  </label>
                  {uploadedFile && (
                    <p className="text-sm text-leaf-green mt-2">
                      {uploadedFile.name} uploaded successfully
                    </p>
                  )}
                </div>
              </div>

              {/* Compliance Results */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Compliance Assessment</h3>
                <div className="space-y-4">
                  {complianceData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.category}</h4>
                        <div className="flex items-center space-x-2">
                          {item.status === 'Compliant' ? (
                            <CheckCircle className="h-5 w-5 text-leaf-green" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            item.status === 'Compliant' ? 'text-leaf-green' : 'text-yellow-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.score >= 80 ? 'bg-leaf-green' : 'bg-yellow-500'}`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emissions' && (
            <div className="space-y-8">
              {/* Emissions Chart */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Emissions by Scope</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scope1" stackId="a" fill="#ef4444" name="Scope 1" />
                    <Bar dataKey="scope2" stackId="a" fill="#f97316" name="Scope 2" />
                    <Bar dataKey="scope3" stackId="a" fill="#eab308" name="Scope 3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Supply Chain Tracker */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Supply Chain Emissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { stage: 'Raw Materials', emissions: '450 tCO₂e', trend: '-5%' },
                    { stage: 'Manufacturing', emissions: '1,200 tCO₂e', trend: '-8%' },
                    { stage: 'Transportation', emissions: '300 tCO₂e', trend: '-12%' },
                    { stage: 'Distribution', emissions: '200 tCO₂e', trend: '-3%' },
                    { stage: 'End of Life', emissions: '150 tCO₂e', trend: '-15%' },
                    { stage: 'Total', emissions: '2,300 tCO₂e', trend: '-7%' }
                  ].map((stage, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">{stage.stage}</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stage.emissions}</div>
                      <div className="text-sm text-leaf-green">{stage.trend} vs last quarter</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="space-y-8">
              {/* Carbon Credits Portfolio */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Carbon Credits Portfolio</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Credits
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {carbonCredits.map((credit, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {credit.project}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {credit.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {credit.credits}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {credit.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              credit.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {credit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Smart Contract Validator */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Blockchain Smart Contract Validator</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="mb-2">// Carbon Credit Smart Contract</div>
                  <div className="mb-2">contract CarbonCredit &#123;</div>
                  <div className="ml-4 mb-2">mapping(address =&gt; uint256) public credits;</div>
                  <div className="ml-4 mb-2">event CreditTransfer(address from, address to, uint256 amount);</div>
                  <div className="ml-4 mb-2"></div>
                  <div className="ml-4 mb-2">function transferCredits(address to, uint256 amount) public &#123;</div>
                  <div className="ml-8 mb-2">require(credits[msg.sender] &gt;= amount, "Insufficient credits");</div>
                  <div className="ml-8 mb-2">credits[msg.sender] -= amount;</div>
                  <div className="ml-8 mb-2">credits[to] += amount;</div>
                  <div className="ml-8 mb-2">emit CreditTransfer(msg.sender, to, amount);</div>
                  <div className="ml-4 mb-2">&#125;</div>
                  <div>&#125;</div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-leaf-green" />
                  <span className="text-sm text-leaf-green">Contract validated and deployed</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-8">
              {/* Report Generation */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Generate Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'ESG Compliance Report', description: 'Comprehensive compliance assessment', format: 'PDF' },
                    { title: 'Carbon Footprint Analysis', description: 'Detailed emissions breakdown', format: 'Excel' },
                    { title: 'Supply Chain Report', description: 'Scope 3 emissions analysis', format: 'PDF' },
                    { title: 'Carbon Credits Summary', description: 'Portfolio and trading history', format: 'PDF' },
                    { title: 'Sustainability Dashboard', description: 'Executive summary report', format: 'PowerPoint' },
                    { title: 'Regulatory Filing', description: 'Ready-to-submit compliance data', format: 'XML' }
                  ].map((report, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-leaf-green transition-colors">
                      <h4 className="font-semibold mb-2">{report.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{report.format}</span>
                        <button className="btn-primary text-sm py-2 px-4">
                          <Download className="h-4 w-4 mr-1" />
                          Generate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reports */}
              <div className="card">
                <h3 className="text-xl font-bold mb-6">Recent Reports</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Q2 2024 ESG Report.pdf', date: '2024-06-15', size: '2.4 MB' },
                    { name: 'Carbon Footprint May 2024.xlsx', date: '2024-05-31', size: '1.8 MB' },
                    { name: 'Supply Chain Analysis.pdf', date: '2024-05-28', size: '3.1 MB' },
                    { name: 'Compliance Summary Q1.pdf', date: '2024-03-31', size: '1.2 MB' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-sm">{report.name}</div>
                          <div className="text-xs text-gray-500">{report.date} • {report.size}</div>
                        </div>
                      </div>
                      <button className="text-leaf-green hover:text-dark-green">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin