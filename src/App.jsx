import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SubscribePage from './SubscribePage'

const API_BASE = 'http://localhost:3001'

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Technology', 'Business', 'Science', 'World', 'Gaming']

  useEffect(() => {
    fetchNews(selectedCategory)
  }, [selectedCategory])

  const fetchNews = async (category) => {
    try {
      setLoading(true)
      const url = category === 'All' 
        ? `${API_BASE}/news` 
        : `${API_BASE}/news?category=${category}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.success) {
        setNews(data.articles)
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = news.filter(article => {
    const matchesSearch = article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    try {
      const response = await fetch(`${API_BASE}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      if (data.success) {
        setEmailSubmitted(true)
        setTimeout(() => {
          setEmailSubmitted(false)
          setEmail('')
        }, 3000)
      } else {
        setEmailError(data.message)
      }
    } catch (error) {
      setEmailError('Failed to subscribe. Please try again.')
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold tracking-tight">AI NEWS</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#news" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">News</a>
              <a href="#categories" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">Categories</a>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/subscribe" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300">Subscribe</Link>
            </div>
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

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up">
            Get NEWS in{' '}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              5 mins
            </span>{' '}
            a day.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Get the latest news, understand why it matters, and stay informed every day.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              required
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors duration-300"
            />
            <button
              type="submit"
              className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2 ${
                emailSubmitted ? 'bg-green-500' : ''
              }`}
            >
              {emailSubmitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {emailError && <p className="text-red-400 text-sm mt-3">{emailError}</p>}
        </div>
      </section>

      <section id="categories" className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="py-12 px-4 pb-20" style={{ minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Loading news...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory('All'); }}
                className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {filteredNews.length > 0 && selectedCategory === 'All' && (
                <div className="mb-12">
                  <article 
                    onClick={() => setSelectedArticle(filteredNews[0])}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-[400px] md:h-[500px]">
                      <img
                        src={filteredNews[0].thumbnail}
                        alt={filteredNews[0].headline}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                        {filteredNews[0].category}
                      </span>
                      <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white group-hover:text-gray-200 transition-colors">
                        {filteredNews[0].headline}
                      </h2>
                      <p className="text-gray-300 text-sm md:text-lg line-clamp-2 max-w-3xl">
                        {filteredNews[0].summary}
                      </p>
                      <p className="text-gray-500 text-xs mt-3">{formatDate(filteredNews[0].date)}</p>
                    </div>
                  </article>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === 'All' ? filteredNews.slice(1) : filteredNews).map((article) => (
                  <article
                    key={article.id}
                    className="news-card bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={article.thumbnail}
                        alt={article.headline}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-500 text-xs mb-2">{formatDate(article.date)}</p>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                        {article.headline}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="inline-flex items-center text-sm font-medium text-white hover:text-gray-300 transition-colors duration-300 group/btn"
                      >
                        Read More
                        <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2026 AI News. All rights reserved.</p>
        </div>
      </footer>

      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-black border border-white/20 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedArticle.thumbnail}
                alt={selectedArticle.headline}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full">
                  {selectedArticle.category}
                </span>
                <span className="text-gray-500 text-sm">{formatDate(selectedArticle.date)}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedArticle.headline}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {selectedArticle.summary}
              </p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 bg-white text-black font-medium rounded-lg transition-all duration-300 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
