/**
 * analyzePdfController.js
 *
 * Thin controller for PDF uploads.
 * Multer middleware puts the uploaded file in req.file.
 */

const { analyzeNewspaperPdf } = require("../services/analyzePdfService");

const analyzePdfController = async (req, res) => {
    try {
        // Multer puts the file here — check it exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF file uploaded. Please attach a PDF file.",
            });
        }

        // Only accept PDF files
        if (req.file.mimetype !== "application/pdf") {
            return res.status(415).json({
                success: false,
                message: "Invalid file type. Only PDF files are accepted.",
            });
        }

        // File size guard — Gemini supports up to 50MB inline
        const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
        if (req.file.size > MAX_SIZE_BYTES) {
            return res.status(413).json({
                success: false,
                message: "PDF file is too large. Maximum 50MB allowed.",
            });
        }

        // Delegate to service — single Gemini call with PDF buffer
        const result = await analyzeNewspaperPdf(req.file.buffer);

        return res.status(200).json({
            success: true,
            totalTopics: result.topics.length,
            data: result,
        });

    } catch (error) {
        console.error("PDF Analyze Controller Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze the PDF.",
            error: error.message,
        });
    }
};

module.exports = analyzePdfController;
