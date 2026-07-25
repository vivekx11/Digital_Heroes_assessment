# Page Pulse ⚡

> Production-ready Web Page Technical & SEO Auditor built with Node.js, Express, React (Vite), and Tailwind CSS.

---

## 📌 Project Overview

**Page Pulse** is a full-stack web application designed to instantly audit any public webpage by URL. It evaluates key performance, technical, and SEO parameters including HTTP status codes, server response times, title tags, meta descriptions, H1 heading counts, image accessibility (`alt` attributes), and total body word counts.

---

## ✨ Features

- **Real-Time Web Scrape & Audit**: Analyzes page HTML structure server-side via Cheerio and calculates latency timing.
- **Modern Responsive UI**: Built with React, Vite, and Tailwind CSS with custom micro-animations and clean glassmorphism styling.
- **Dark Mode Support**: Seamless light/dark theme toggle with persistent `localStorage` synchronization.
- **Robust Error Handling**: Contextual HTTP status code error handling for Invalid URLs (`400`), Request Timeouts (`504`), Non-HTML Content (`415`), and Server Errors (`500`).
- **Request History**: Stores up to 5 recent audit queries in `localStorage` for 1-click re-inspection.
- **Export Capabilities**: One-click **Copy JSON** to clipboard and **Download JSON** audit report files.
- **Comprehensive Unit Tests**: Jest + Supertest test suite covering happy path, invalid inputs, non-HTML responses, and timeout scenarios.
- **Production Ready**: Configured for effortless deployment on Vercel (Frontend) and Render (Backend).

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: Asynchronous JavaScript runtime.
- **Express.js**: Fast, minimalist web framework.
- **Axios**: HTTP client with timeout management.
- **Cheerio**: Fast, flexible server-side HTML parser.
- **Helmet**: Security HTTP headers middleware.
- **CORS**: Cross-Origin Resource Sharing middleware.
- **Express Rate Limit**: Rate limiting middleware for API protection.

### Frontend
- **React (Vite)**: Modern frontend library with fast HMR.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Modern iconography library.

### Testing & Tooling
- **Jest**: JavaScript testing framework.
- **Supertest**: HTTP assertion library for API testing.
- **Nock**: HTTP mocking library for isolated unit tests.
- **Concurrently**: Monorepo task runner to launch backend and frontend simultaneously.

---

## 📁 Folder Structure

```text
DigitalHeroes/
├── package.json                   # Monorepo configuration
├── README.md                      # Comprehensive project documentation
├── vercel.json                    # Vercel deployment configuration
├── render.yaml                    # Render deployment configuration
├── .gitignore
├── backend/
│   ├── package.json               # Backend dependencies and scripts
│   ├── server.js                  # Application server entry point
│   ├── app.js                     # Express app setup (separated for Supertest)
│   ├── .env.example               # Backend environment variable template
│   ├── controllers/
│   │   └── auditController.js     # Route request handler & input validation
│   ├── routes/
│   │   └── auditRoutes.js         # API route definitions (/api/audit)
│   ├── services/
│   │   └── auditService.js        # Axios HTTP fetcher & timing service
│   ├── utils/
│   │   ├── urlValidator.js        # HTTP/HTTPS URL syntax validator
│   │   └── htmlParser.js          # Cheerio HTML metrics extraction utility
│   ├── middleware/
│   │   └── errorHandler.js       # Centralized error handler middleware
│   └── tests/
│       └── audit.test.js          # Jest + Supertest unit test suite
└── frontend/
    ├── package.json               # Frontend dependencies
    ├── vite.config.js             # Vite configuration with API proxying
    ├── index.html                 # HTML template with SEO meta tags
    ├── tailwind.config.js         # Tailwind CSS configuration
    ├── postcss.config.js          # PostCSS configuration
    ├── .env.example               # Frontend environment variable template
    └── src/
        ├── main.jsx               # React DOM root renderer
        ├── App.jsx                # Core application layout
        ├── index.css              # Custom styling & Tailwind directives
        ├── components/
        │   ├── Header.jsx         # Branding header & dark mode toggle
        │   ├── UrlForm.jsx        # URL input form with live validation
        │   ├── LoadingState.jsx   # Animated spinner & progress bar
        │   ├── ResultCards.jsx    # Metric statistic cards with hover effects
        │   ├── RequestHistory.jsx # LocalStorage recent audit list
        │   ├── ExportActions.jsx  # Copy JSON & Download JSON options
        │   ├── ErrorAlert.jsx     # Friendly error alerts
        │   └── Footer.jsx         # Required hyperlink footer
        ├── hooks/
        │   ├── useAudit.js        # Audit API state & history hook
        │   └── useDarkMode.js     # Dark mode state hook
        └── services/
            └── api.js             # Axios base configuration
```

---

## 🚀 Installation & Local Setup

### Quick Start (Single Command)

1. Clone or download the repository into your workspace directory.
2. Install all dependencies for root, backend, and frontend:
   ```bash
   npm install
   ```
3. Start both backend (port 5000) and frontend (port 5173) concurrently:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🔧 Running Backend & Frontend Individually

### Run Backend
```bash
cd backend
npm install
npm run dev
```
The backend API will run on `http://localhost:5000`.

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The Vite frontend will run on `http://localhost:5173`.

---

## 📄 API Contract

### Endpoint
`POST /api/audit`

### Headers
`Content-Type: application/json`

### Sample Request Payload
```json
{
  "url": "https://example.com"
}
```

### Sample Successful Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "status": 200,
    "responseTime": "185ms",
    "pageTitle": "Example Domain",
    "metaDescription": "Example Domain description for documentation",
    "h1Count": 1,
    "missingAltImages": 0,
    "wordCount": 125
  }
}
```

### Error Responses

#### 1. Invalid URL (`400 Bad Request`)
```json
{
  "success": false,
  "message": "Invalid URL"
}
```

#### 2. Request Timeout (`504 Gateway Timeout`)
```json
{
  "success": false,
  "message": "Request timed out"
}
```

#### 3. Non-HTML Content (`415 Unsupported Media Type`)
```json
{
  "success": false,
  "message": "URL does not contain HTML"
}
```

#### 4. Website Unavailable / Internal Error (`500 Internal Server Error`)
```json
{
  "success": false,
  "message": "Website unavailable (HTTP 500)"
}
```

---

## 🧪 Testing

To execute the Jest + Supertest unit test suite:

```bash
npm run test:backend
```
or inside the `backend` directory:
```bash
cd backend
npm test
```

### Test Coverage Highlights
- ✅ **Happy Path**: Verifies valid HTML retrieval, metric parsing, response timing format, and `200` status.
- ✅ **Invalid URL**: Verifies `400` status return on invalid or missing URL parameters.
- ✅ **Non-HTML Response**: Verifies `415` status return when fetching raw images or non-HTML resources.
- ✅ **Timeout Handling**: Verifies `504` status return when requests exceed configured timeouts.
- ✅ **Server Error**: Verifies `500` status return when the target server is unreachable or returns a `5xx` error.

---

## 🌐 Deployment Configuration

### Deploying Backend to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your Git repository.
3. Select **Node** runtime.
4. Set Root Directory to `backend`.
5. Set Build Command to `npm install`.
6. Set Start Command to `npm start`.
7. Configure Environment Variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-frontend.vercel.app`

### Deploying Frontend to Vercel
1. Import your project repository into [Vercel](https://vercel.com).
2. Set Root Directory to `./` (or `frontend`).
3. Set Framework Preset to **Vite**.
4. Configure Build Command: `cd frontend && npm install && npm run build`
5. Configure Output Directory: `frontend/dist`
6. Set Environment Variables:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com/api`

---

## 💡 Three Key Design Decisions

### 1. Separation of Express `app.js` and `server.js`
- **Decision**: Express middleware configuration (`app.js`) was decoupled from server instantiation (`server.js`).
- **Rationale**: Separating the app definition allows Supertest to execute unit tests directly against the Express application instance in memory without binding to an actual TCP port. This avoids `EADDRINUSE` port collision errors during automated test runs while keeping server lifecycle logic clean.

### 2. Cheerio-based Server-Side HTML Parsing with Specific Element Cleaning
- **Decision**: HTML parsing was performed on the backend using Cheerio after stripping `<script>`, `<style>`, `<noscript>`, and SVG elements before word counting.
- **Rationale**: Browser scripts and inline stylesheets contain thousands of code tokens that do not reflect human-readable text content. Cleaning non-visible markup first ensures accurate text word count and prevents false positives when evaluating `alt` attributes or title tags.

### 3. Client-Side Persistence with Graceful LocalStorage History
- **Decision**: Recent audit queries are saved in `localStorage` limited to the 5 most recent unique entries.
- **Rationale**: Storing audit history locally provides immediate value to users without requiring a database backend or user authentication. It allows users to switch between recently analyzed pages instantly with zero latency.

---

## 🤖 AI Usage Disclosure

### How AI Assisted Development
- **Architectural Planning**: AI assisted in breaking down the system into modular components (`controllers`, `services`, `utils`, `components`, `hooks`).
- **Boilerplate Generation**: AI generated initial scaffolding for React components, Tailwind styling, and Jest/Supertest suite structure.
- **Cheerio & Regular Expressions**: AI provided optimized selectors for extracting title, meta tags, missing image alt attributes, and clean word counts.

### Manual Refinement & Verification
- **Error Handling Contracts**: Manually audited and adjusted HTTP status codes (`400`, `415`, `504`, `500`) to strictly match the project specifications.
- **Footer Compliance**: Verified that the footer strictly outputs `Built for Digital Heroes Training Task` hyperlinked to `https://digitalheroesco.com`.
- **Test Mocking**: Added `nock` isolation to ensure tests execute offline reliably without hitting external networks.

---

## 🏷️ Footer Requirement

[Built for Digital Heroes Training Task](https://digitalheroesco.com)
