require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const DB_PATH = path.join(__dirname, 'database.json');

function readDatabase() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { subscribers: [], newsletterHistory: [] };
  }
}

function writeDatabase(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

let cachedNews = {};
let cacheTimestamp = null;
const CACHE_DURATION = 15 * 60 * 1000;

const categoryMap = {
  'Technology': 'technology',
  'Business': 'business',
  'Science': 'science',
  'World': 'general',
  'Health': 'health',
  'Sports': 'sports',
  'Entertainment': 'entertainment'
};

const reverseCategoryMap = {
  'technology': 'Technology',
  'business': 'Business',
  'science': 'Science',
  'general': 'World',
  'health': 'Health',
  'sports': 'Sports',
  'entertainment': 'Entertainment'
};

async function fetchNewsFromAPI(category = null) {
  const apiKey = process.env.NEWS_API_KEY;
  
  if (!apiKey || apiKey === 'your_newsapi_key_here') {
    console.log('Using fallback news (no API key configured)');
    return getFallbackNews(category);
  }

  try {
    const newsCategory = categoryMap[category] || 'technology';
    const url = `https://newsapi.org/v2/top-headlines?category=${newsCategory}&country=us&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok' && data.articles) {
      const articles = data.articles
        .filter(article => article.urlToImage)
        .map((article, index) => ({
          id: Date.now() + index,
          headline: article.title,
          summary: article.description || article.content || 'No description available',
          thumbnail: article.urlToImage,
          date: article.publishedAt ? article.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
          category: reverseCategoryMap[category] || category || 'Technology',
          source: article.source.name
        }));
      
      cachedNews[category || 'all'] = articles;
      cacheTimestamp = Date.now();
      
      return articles;
    } else {
      console.error('NewsAPI error:', data.message || 'Unknown error');
      return getFallbackNews(category);
    }
  } catch (error) {
    console.error('Failed to fetch from NewsAPI:', error);
    return getFallbackNews(category);
  }
}

function getFallbackNews(category) {
  let filteredNews = newsArticles;
  if (category && category !== 'All') {
    filteredNews = newsArticles.filter(article => article.category === category);
  }
  return filteredNews;
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'AI News API',
    endpoints: {
      'GET /': 'This help message',
      'POST /subscribe': 'Subscribe email - { email: "user@example.com" }',
      'POST /send-newsletter': 'Send newsletter - { email: "optional" }',
      'GET /news': 'Get news - ?category=Technology',
      'GET /news/refresh': 'Force refresh news cache',
      'GET /subscribers': 'Get subscriber count'
    }
  });
});

const newsArticles = [
  {
    id: 1,
    headline: "Revolutionary AI Model Breaks New Ground in Natural Language Processing",
    summary: "A groundbreaking artificial intelligence model has achieved unprecedented performance in understanding and generating human language.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    date: "2026-02-15",
    category: "Technology"
  },
  {
    id: 2,
    headline: "Global Markets Rally as Tech Sector Reports Record Earnings",
    summary: "Stock markets worldwide surge following impressive quarterly results from major technology companies.",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "2026-02-14",
    category: "Business"
  },
  {
    id: 3,
    headline: "Scientists Discover New Species in Deep Ocean Expedition",
    summary: "Marine biologists have identified several previously unknown species during a deep-sea exploration mission.",
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=250&fit=crop",
    date: "2026-02-13",
    category: "Science"
  },
  {
    id: 4,
    headline: "International Climate Summit Reaches Historic Agreement",
    summary: "World leaders commit to ambitious carbon reduction targets in landmark deal.",
    thumbnail: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
    date: "2026-02-12",
    category: "World"
  },
  {
    id: 5,
    headline: "New Quantum Computer Achieves Major Breakthrough",
    summary: "Researchers announce a major milestone in quantum computing, promising faster drug discovery and climate modeling.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    date: "2026-02-11",
    category: "Technology"
  },
  {
    id: 6,
    headline: "Electric Vehicle Sales Surpass Traditional Cars for First Time",
    summary: "EVs now dominate global car sales as consumers shift toward sustainable transportation options.",
    thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop",
    date: "2026-02-10",
    category: "Business"
  },
  {
    id: 7,
    headline: "Space Agency Announces Plans for First Mars Colony",
    summary: "Ambitious new project aims to establish permanent human presence on Mars within the next decade.",
    thumbnail: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=250&fit=crop",
    date: "2026-02-09",
    category: "Science"
  },
  {
    id: 8,
    headline: "Major Trade Agreement Reshapes Global Economy",
    summary: "Historic partnership between economic powers promises to boost trade and reduce tariffs worldwide.",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "2026-02-08",
    category: "World"
  },
  {
    id: 9,
    headline: "Next-Gen Gaming Console Launches with Revolutionary Features",
    summary: "The highly anticipated gaming console hits stores with groundbreaking technology and exclusive game titles.",
    thumbnail: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop",
    date: "2026-02-07",
    category: "Gaming"
  },
  {
    id: 10,
    headline: "AI-Powered Healthcare Diagnostics Transform Patient Care",
    summary: "Machine learning algorithms now detect diseases earlier and more accurately than ever before.",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    date: "2026-02-06",
    category: "Technology"
  }
];

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function createNewsletterHTML(articles) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111111; border-radius: 8px;">
          <tr>
            <td style="padding: 30px; border-bottom: 1px solid #333333;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">AI News</h1>
              <p style="margin: 10px 0 0 0; color: #888888; font-size: 14px;">Your Daily Source for AI & Tech News</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 22px;">Top Headlines</h2>
              ${articles.map(article => `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px; border-bottom: 1px solid #222222; padding-bottom: 25px;">
                  <tr>
                    <td>
                      <img src="${article.thumbnail}" alt="${article.headline}" style="width: 100%; max-width: 200px; height: auto; border-radius: 4px; float: left; margin-right: 20px;">
                      <div style="overflow: hidden;">
                        <span style="display: inline-block; padding: 4px 12px; background-color: #222222; color: #ffffff; font-size: 11px; border-radius: 20px; margin-bottom: 8px;">${article.category}</span>
                        <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; line-height: 1.4;"><a href="#" style="color: #ffffff; text-decoration: none;">${article.headline}</a></h3>
                        <p style="margin: 0; color: #888888; font-size: 13px; line-height: 1.5;">${article.summary}</p>
                      </div>
                    </td>
                  </tr>
                </table>
              `).join('')}
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; border-top: 1px solid #333333; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px;">© 2026 AI News. All rights reserved.</p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">You received this email because you subscribed to AI News newsletter.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

app.post('/subscribe', (req, res) => {
  try {
    const { email, name, categories, frequency } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const db = readDatabase();
    
    const emailExists = db.subscribers.some(sub => sub.email === email);
    if (emailExists) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }

    const newSubscriber = {
      id: Date.now(),
      email,
      name: name || '',
      categories: categories || [],
      frequency: frequency || 'daily',
      subscribedAt: new Date().toISOString()
    };
    
    db.subscribers.push(newSubscriber);
    writeDatabase(db);

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      subscriberCount: db.subscribers.length
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/send-newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    let targetEmails = subscribers;
    
    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
      }
      targetEmails = [email];
    }

    if (targetEmails.length === 0) {
      return res.status(400).json({ success: false, message: 'No subscribers to send newsletter' });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"AI News" <noreply@ainews.com>',
      to: targetEmails,
      subject: 'Your Daily AI News Update',
      html: createNewsletterHTML(newsArticles)
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: `Newsletter sent to ${targetEmails.length} subscriber(s)`,
      subscriberCount: subscribers.length
    });
  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({ success: false, message: 'Failed to send newsletter' });
  }
});

app.get('/news', async (req, res) => {
  try {
    const { category } = req.query;
    
    const articles = await fetchNewsFromAPI(category);
    
    res.status(200).json({ 
      success: true, 
      articles: articles
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/subscribers', (req, res) => {
  const db = readDatabase();
  res.status(200).json({ 
    success: true, 
    count: db.subscribers.length,
    subscribers: db.subscribers
  });
});

app.get('/news/refresh', async (req, res) => {
  try {
    cachedNews = {};
    cacheTimestamp = null;
    const articles = await fetchNewsFromAPI(req.query.category);
    res.status(200).json({ 
      success: true, 
      message: 'News cache refreshed',
      articles: articles
    });
  } catch (error) {
    console.error('Refresh news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`AI News Backend running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /subscribe - Subscribe to newsletter');
  console.log('  POST /send-newsletter - Send newsletter to all subscribers');
  console.log('  POST /send-newsletter?email=test@example.com - Send to specific email');
  console.log('  GET  /news - Get news articles');
  console.log('  GET  /news/refresh - Force refresh news cache');
  console.log('  GET  /subscribers - Get subscriber count');
  
  if (process.env.NEWS_API_KEY && process.env.NEWS_API_KEY !== 'your_newsapi_key_here') {
    console.log('  NewsAPI: Enabled');
  } else {
    console.log('  NewsAPI: Not configured (using fallback news)');
  }
});
