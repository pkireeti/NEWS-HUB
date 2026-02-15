import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:3001'

const categories = ['Technology', 'Business', 'Science', 'World', 'Gaming']

function SubscribePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedCategories: [],
    frequency: 'daily'
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCategoryToggle = (category) => {
    setFormData(prev => {
      const current = prev.selectedCategories
      if (current.includes(category)) {
        return { ...prev, selectedCategories: current.filter(c => c !== category) }
      } else {
        return { ...prev, selectedCategories: [...current, category] }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.email.trim()) {
      setError('Please enter your email')
      return
    }
    if (formData.selectedCategories.length === 0) {
      setError('Please select at least one category')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          name: formData.name,
          categories: formData.selectedCategories,
          frequency: formData.frequency
        })
      })
      const data = await response.json()
      
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Failed to subscribe')
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Welcome, {formData.name}!</h2>
          <p className="text-gray-400 mb-8">
            You've successfully subscribed to {formData.frequency} {formData.selectedCategories.join(', ')} news.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold tracking-tight">AI NEWS</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-16 px-4 relative overflow-hidden" style={{ minHeight: '400px' }}>
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-40%] w-[200%] h-[200%]">
            <div className="absolute top-[0%] left-[0%] text-6xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(0deg)', textShadow: '0 0 20px rgba(255,255,255,0.5)', animation: 'stripLeft 40s linear infinite', opacity: 0.15 }}>AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS</div>
            <div className="absolute top-[15%] left-[0%] text-5xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-15deg)', textShadow: '0 0 15px rgba(255,255,255,0.4)', animation: 'stripRight 35s linear infinite', opacity: 0.12 }}>STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES</div>
            <div className="absolute top-[30%] left-[0%] text-7xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(10deg)', textShadow: '0 0 25px rgba(255,255,255,0.5)', animation: 'stripLeft 45s linear infinite', opacity: 0.18 }}>TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS TECH NEWS</div>
            <div className="absolute top-[45%] left-[0%] text-4xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-5deg)', textShadow: '0 0 12px rgba(255,255,255,0.3)', animation: 'stripRight 30s linear infinite', opacity: 0.1 }}>AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS</div>
            <div className="absolute top-[60%] left-[0%] text-6xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(20deg)', textShadow: '0 0 18px rgba(255,255,255,0.4)', animation: 'stripLeft 38s linear infinite', opacity: 0.14 }}>STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES STOCK UPDATES</div>
            <div className="absolute top-[75%] left-[0%] text-5xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(-25deg)', textShadow: '0 0 15px rgba(255,255,255,0.35)', animation: 'stripRight 42s linear infinite', opacity: 0.11 }}>BREAKING NEWS BREAKING NEWS BREAKING NEWS BREAKING NEWS BREAKING NEWS BREAKING NEWS BREAKING NEWS</div>
            <div className="absolute top-[90%] left-[0%] text-4xl font-bold text-white whitespace-nowrap" style={{ transform: 'rotate(5deg)', textShadow: '0 0 10px rgba(255,255,255,0.3)', animation: 'stripLeft 33s linear infinite', opacity: 0.09 }}>AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS AI NEWS</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 pt-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Informed</h1>
            <p className="text-gray-400 text-lg">Get the news that matters to you, delivered your way.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black border border-white/20 rounded-2xl p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-900 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Select Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      formData.selectedCategories.includes(category)
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Delivery Frequency</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: 'daily' })}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    formData.frequency === 'daily'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: 'weekly' })}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    formData.frequency === 'weekly'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubscribePage
