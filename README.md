# 📰 UPSC Newspaper Analyzer

An AI-powered full-stack web application that analyzes newspaper PDFs for UPSC Civil Services Exam relevance. Powered by the Google Gemini API, it extracts key topics, maps them to UPSC syllabus sections, and provides structured study insights.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion |
| Backend | Node.js, Express 5, Multer |
| AI | Google Gemini API (`@google/genai`) |

---

## 📁 Project Structure

```text
ai-upsc-newspaper-analyzer/
├── client/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── index.html
│
└── server/          # Express backend
    ├── controllers/
    ├── routes/
    ├── services/
    ├── utils/
    ├── prompts/
    └── app.js
⚙️ Getting Started
Prerequisites
Node.js v18+
A Google Gemini API key from Google AI Studio
1. Clone the repository
git clone https://github.com/SumitKurmii/ai-upsc-newspaper-analyzer.git
cd ai-upsc-newspaper-analyzer
2. Set up the Server
cd server
npm install

Create a .env file based on .env.example and add your Gemini API key:

PORT=7001
GEMINI_API_KEY=your_api_key_here

Then start the server:

npm run dev
3. Set up the Client

Open another terminal from the project root:

cd client
npm install
npm run dev

The client runs at http://localhost:5173 and the server runs at http://localhost:7001.

🔑 Environment Variables

The server requires the following environment variables:

Variable	Description
PORT	Port for the Express server
GEMINI_API_KEY	Your Google Gemini API key
CLIENT_URL	URL of the frontend application

See server/.env.example for the required configuration.

✨ Features
Upload newspaper PDFs
AI-powered newspaper analysis
Extract UPSC-relevant topics
GS Paper classification
Subject-wise categorization
Prelims and Mains relevance
Key issues and important facts
Structured study insights
UPSC-focused summaries
📄 License

This project is licensed under the MIT License.


One important point: if you **did not actually add an MIT `LICENSE` file** when creating the GitHub repository, then don't claim MIT yet. Either add an MIT license or change the last section.

Since your repository already has a local README, after replacing its content run:

```powershell
git add README.md
git commit -m "Update project README"
git push