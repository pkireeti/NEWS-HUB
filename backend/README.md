# AI News Backend

Backend server for the AI News web application.

## Setup

1. Navigate to the backend directory:
   ```bash
   cd news-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your email credentials.

## Running the Server

```bash
npm start
```

The server will start on http://localhost:3001

## API Endpoints

### POST /subscribe
Subscribe an email to the newsletter.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "subscriberCount": 1
}
```

### POST /send-newsletter
Send newsletter to all subscribers or a specific email.

**Request:**
```json
{
  "email": "user@example.com"  // optional - send to specific email
}
```

**Response:**
```json
{
  "success": true,
  "message": "Newsletter sent to 5 subscriber(s)",
  "subscriberCount": 5
}
```

### GET /news
Get news articles (optionally filtered by category).

**Query Parameters:**
- `category` (optional): Filter by category (Technology, Business, Science, World, Trending)

**Example:**
```
GET /news?category=Technology
```

### GET /subscribers
Get the number of subscribers.

## Connecting Frontend to Backend

Update your frontend to fetch from the backend:

1. Start backend on port 3001
2. Update frontend API calls to use `http://localhost:3001`

Example fetch for news:
```javascript
const response = await fetch('http://localhost:3001/news');
const data = await response.json();
```

Example subscribe:
```javascript
const response = await fetch('http://localhost:3001/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

## Email Setup

### Gmail
1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password
4. Use the App Password in EMAIL_PASS

### Other Email Services
Update `EMAIL_SERVICE` in `.env` to your provider (e.g., 'smtp.office365.com') and configure SMTP settings accordingly.
