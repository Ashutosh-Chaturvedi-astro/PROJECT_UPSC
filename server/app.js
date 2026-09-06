require("dotenv").config();

const express = require("express");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");

const app = express();

// Allow requests only from the deployed frontend (or localhost in dev)
const allowedOrigins = [
    process.env.CLIENT_URL || "http://localhost:5173",
    "http://localhost:5173", // always allow local dev
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, Render health checks)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin ${origin} not allowed`));
        }
    },
    credentials: true,
}));

app.use(express.json({
    limit: "10mb"
}));

// Health check — Render pings this to verify the service is alive
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/analyze", analyzeRoute);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});