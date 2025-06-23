import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, Calculator, Trophy, ArrowRight, Sparkles, Target, Award } from 'lucide-react'

const Consumer = () => {
  const tools = [
    {
      icon: <Calculator className="h-12 w-12" />,
      title: "AI Carbon Estimator",
      description: "Get instant CO₂ estimates for any product. Simply enter product details or upload an image, and our AI will calculate the carbon footprint including manufacturing, shipping, and disposal.",
      features: ["Product image recognition", "Real-time calculations", "Eco-friendly alternatives"],
      link: "/carbon-estimator",
      color: "bg-blue-500"
    },
    {
      icon: <Bot className="h-12 w-12" />,
      title: "AI GreenBot Assistant",
      description: "Your personal sustainability coach that answers questions, provides recommendations, and helps you make greener choices in real-time conversations.",
      features: ["24/7 availability", "Personalized advice", "Product comparisons"],
      link: "/greenbot",
      color: "bg-leaf-green"
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Gamified Dashboard",
      description: "Track your environmental impact with beautiful visualizations, compete with friends, earn badges, and celebrate your sustainability milestones.",
      features: ["Progress tracking", "Leaderboards", "Achievement system"],
      link: "/dashboard",
      color: "bg-purple-500"
    }
  ]

  const benefits = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Shopping",
      description: "Make informed decisions with AI-powered product analysis"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Setting",
      description: "Set and achieve personalized sustainability targets"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Recognition",
      description: "Earn badges and climb leaderboards for your green actions"
    }
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
              For Shoppers & <span className="text-leaf-green">Individuals</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Empower your sustainable lifestyle with AI-driven insights, personalized recommendations, 
              and gamified tracking that makes going green engaging and rewarding.
            </p>
            <div className="flex justify-center">
              <Link to="/greenbot" className="btn-primary inline-flex items-center text-lg">
                Get Started with GreenBot
                <Bot className="ml-2 h-6 w-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Three Powerful Tools for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to understand, track, and improve your environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card hover:scale-105 group"
              >
                <div className={`${tool.color} text-white p-4 rounded-lg inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-leaf-green rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to={tool.link} 
                  className="btn-primary w-full inline-flex items-center justify-center group-hover:bg-dark-green"
                >
                  Try Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="gradient-bg section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community of conscious consumers making a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-lg">
                  <div className="text-leaf-green">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Analyze",
                description: "Use our AI tools to analyze products and understand their environmental impact"
              },
              {
                step: "02",
                title: "Track",
                description: "Monitor your carbon footprint and sustainability progress over time"
              },
              {
                step: "03",
                title: "Improve",
                description: "Get personalized recommendations and take action to reduce your impact"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="text-6xl font-bold text-leaf-green opacity-20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-leaf-green mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
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
              Start Your Sustainable Journey Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of conscious consumers already making a difference with our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/carbon-estimator" className="bg-white text-leaf-green hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center">
                Try Carbon Estimator
                <Calculator className="ml-2 h-5 w-5" />
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

export default Consumer