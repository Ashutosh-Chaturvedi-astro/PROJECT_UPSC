# 📰 UPSC Newspaper Analyzer

A full-stack MERN-style web application that analyzes newspaper articles for **UPSC Civil Services exam** relevance. Powered by the **Google Gemini AI** API, it extracts key topics, maps them to UPSC syllabus sections, and provides structured study notes.

---

## 🚀 Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion |
| Backend  | Node.js, Express 5, Multer            |
| AI       | Google Gemini API (`@google/genai`)   |

---

## 📁 Project Structure

```
UPSCNewspaperAnalyzer/
├── client/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── index.html
└── server/          # Express backend
    ├── controllers/
    ├── routes/
    ├── services/
    ├── utils/
    ├── prompts/
    └── app.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repo
```bash
git clone https://github.com/Amar0269/UPSCResumeAnalyzer.git
cd UPSCResumeAnalyzer
```

### 2. Setup the Server
```bash
cd server
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```

### 3. Setup the Client
```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:7001`.

---

## 🔑 Environment Variables

See [`server/.env.example`](server/.env.example) for required variables.

| Variable         | Description                    |
|------------------|--------------------------------|
| `PORT`           | Port for the Express server    |
| `GEMINI_API_KEY` | Your Google Gemini API key     |

---

## 📄 License

MIT
