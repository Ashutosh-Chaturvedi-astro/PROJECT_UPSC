/**
 * analyzeController.js
 *
 * Thin controller — handles HTTP concerns only.
 * All business logic lives in analyzeService.
 */

const { analyzeNewspaper } = require("../services/analyzeService");

const analyzeController = async (req, res) => {
    try {
        const { newspaper } = req.body;

        // Input validation
        if (!newspaper || typeof newspaper !== "string" || newspaper.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Newspaper text is required and must be a non-empty string.",
            });
        }

        // Input size guard — reject excessively large inputs
        if (newspaper.length > 500000) {
            return res.status(413).json({
                success: false,
                message: "Newspaper text is too large. Maximum 500,000 characters allowed.",
            });
        }

        // Delegate to service — single Gemini call
        const result = await analyzeNewspaper(newspaper);

        return res.status(200).json({
            success: true,
            totalTopics: result.topics.length,
            data: result,
        });

    } catch (error) {
        console.error("Analyze Controller Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze newspaper.",
            error: error.message,
        });
    }
};

module.exports = analyzeController;