import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'

const GreenBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm GreenBot, your AI sustainability assistant. I can help you make eco-friendly choices, find sustainable alternatives, and answer questions about environmental impact. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    "What's a better alternative to cotton?",
    "How can I reduce my fashion footprint?",
    "What are the most sustainable packaging materials?",
    "How do I calculate my home's carbon footprint?",
    "What's the environmental impact of fast fashion?",
    "Best eco-friendly cleaning products?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage) => {
    const responses = {
      'cotton': "Great question! Cotton alternatives include:\n\n🌱 **Organic Cotton** - Uses 91% less water\n🌿 **Hemp** - Grows quickly, needs minimal water\n🌾 **Linen** - Made from flax, biodegradable\n🧬 **Tencel/Lyocell** - Made from sustainably sourced wood\n\nHemp is often the most sustainable choice - it actually improves soil health and absorbs more CO₂ than cotton during growth!",
      
      'fashion': "Here are key ways to reduce your fashion footprint:\n\n👕 **Buy Less, Choose Better** - Invest in quality pieces\n♻️ **Shop Secondhand** - Reduces demand for new production\n🔄 **Clothing Swaps** - Trade with friends\n🧵 **Repair & Upcycle** - Extend garment life\n📦 **Sustainable Brands** - Look for B-Corp certified companies\n\nDid you know? The fashion industry produces 10% of global carbon emissions - more than aviation and shipping combined!",
      
      'packaging': "Sustainable packaging materials ranked by eco-friendliness:\n\n🥇 **Mushroom Packaging** - Biodegradable mycelium-based\n🥈 **Seaweed Packaging** - Edible and compostable\n🥉 **Recycled Cardboard** - High recycling rate\n🌾 **Cornstarch Packing Peanuts** - Dissolve in water\n📦 **Recycled Paper** - Renewable and biodegradable\n\nAvoid: Styrofoam (takes 500+ years to decompose) and mixed materials that can't be recycled.",
      
      'home': "To calculate your home's carbon footprint:\n\n⚡ **Energy Use** - Check utility bills (kWh × emission factor)\n🏠 **Heating/Cooling** - Biggest impact (40-50% of home energy)\n💡 **Appliances** - Look for ENERGY STAR ratings\n🚿 **Water Heating** - 2nd largest energy use\n\n**Quick wins:**\n- Switch to LED bulbs (-80% energy)\n- Programmable thermostat (-10% heating/cooling)\n- Unplug devices when not in use\n\nWant me to help calculate specific areas?",
      
      'cleaning': "Best eco-friendly cleaning products:\n\n🧽 **DIY Options:**\n- White vinegar + water (glass, surfaces)\n- Baking soda (scrubbing, deodorizing)\n- Castile soap (all-purpose)\n\n🌿 **Certified Brands:**\n- Seventh Generation\n- Ecover\n- Method\n- Mrs. Meyer's\n\nLook for EPA Safer Choice labels and avoid: phosphates, chlorine bleach, ammonia, and synthetic fragrances."
    }

    // Find matching response based on keywords
    const lowerMessage = userMessage.toLowerCase()
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }

    // Default responses for common patterns
    if (lowerMessage.includes('carbon') || lowerMessage.includes('co2')) {
      return "Carbon footprint varies by product and lifestyle! The average American generates about 16 tons of CO₂ per year. Key areas to focus on:\n\n🚗 Transportation (29%)\n⚡ Energy use (28%)\n🍖 Food choices (10-15%)\n\nWould you like specific tips for any of these areas?"
    }

    if (lowerMessage.includes('sustainable') || lowerMessage.includes('eco')) {
      return "Sustainability is about meeting our needs without compromising future generations! Here are some key principles:\n\n🔄 **Circular Economy** - Reduce, reuse, recycle\n🌱 **Renewable Resources** - Solar, wind, sustainable materials\n🌍 **Local Sourcing** - Reduces transportation emissions\n⚖️ **Fair Trade** - Supports ethical practices\n\nWhat specific area interests you most?"
    }

    // Generic helpful response
    return "That's a great question! While I don't have specific information about that topic, I can help you with:\n\n• Sustainable product alternatives\n• Carbon footprint calculations\n• Eco-friendly lifestyle tips\n• Environmental impact of common products\n\nTry asking about cotton alternatives, reducing fashion footprint, or sustainable packaging materials!"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-mint to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="bg-leaf-green p-4 rounded-full inline-block mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GreenBot <span className="text-leaf-green">Assistant</span>
          </h1>
          <p className="text-lg text-gray-600">
            Your AI-powered sustainability coach, available 24/7
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-gray-500' : 'bg-leaf-green'}`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${message.type === 'user' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <div className="whitespace-pre-line text-sm">
                      {message.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-leaf-green flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                Try asking:
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-light-mint text-leaf-green px-3 py-1 rounded-full hover:bg-leaf-green hover:text-white transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-gray-100">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about sustainable alternatives, carbon footprints, or eco-friendly tips..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-leaf-green focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "AI-Powered Insights",
              description: "Get personalized recommendations based on your lifestyle and preferences"
            },
            {
              icon: <Bot className="h-6 w-6" />,
              title: "24/7 Availability",
              description: "Ask questions anytime and get instant, helpful responses"
            },
            {
              icon: <User className="h-6 w-6" />,
              title: "Conversational",
              description: "Natural language processing for easy, human-like conversations"
            }
          ].map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="bg-leaf-green text-white p-3 rounded-lg inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default GreenBot