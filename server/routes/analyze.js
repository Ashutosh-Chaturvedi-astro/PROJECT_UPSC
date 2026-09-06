const express = require("express");
const multer = require("multer");

const router = express.Router();

const analyzeController = require("../controllers/analyzeController");
const analyzePdfController = require("../controllers/analyzePdfController");

// Multer with memory storage — file is available as req.file.buffer
// No disk writes needed since we send the buffer directly to Gemini
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

// POST /api/analyze — plain text newspaper
router.post("/", analyzeController);

// POST /api/analyze/pdf — PDF file upload
router.post("/pdf", upload.single("newspaper"), analyzePdfController);

module.exports = router;