/**
 * analyzeService.js
 *
 * Core service that orchestrates the entire newspaper analysis
 * in a single Gemini API call.
 *
 * Flow:
 *   newspaper text → build prompt → call Gemini once → parse & validate JSON
 */

const { generateContent } = require("./geminiService");
const analyzePrompt = require("../prompts/analyzePrompt");
const parseJson = require("../utils/parseJson");

/**
 * Analyzes the full newspaper text and returns structured UPSC notes.
 *
 * @param {string} newspaperText - The complete newspaper text
 * @returns {object} Parsed JSON with topics array
 * @throws {Error} If Gemini call fails or response is invalid
 */
async function analyzeNewspaper(newspaperText) {
    // Build the comprehensive prompt
    const prompt = analyzePrompt(newspaperText);

    // Single Gemini API call — does filtering, classification, and notes
    const rawResponse = await generateContent(prompt);

    // Parse and extract JSON from the response
    const parsed = parseJson(rawResponse);

    // Validate the response structure
    validateResponse(parsed);

    return parsed;
}

/**
 * Validates that the Gemini response matches the expected schema.
 * Throws descriptive errors if the structure is wrong.
 *
 * @param {object} data - The parsed JSON response
 * @throws {Error} If validation fails
 */
function validateResponse(data) {
    if (!data || typeof data !== "object") {
        throw new Error("Gemini returned invalid data: expected a JSON object.");
    }

    if (!Array.isArray(data.topics)) {
        throw new Error("Gemini response is missing the 'topics' array.");
    }

    if (data.topics.length === 0) {
        throw new Error("Gemini returned zero topics. The newspaper may not contain UPSC-relevant content.");
    }

    // Validate each topic has the required fields
    const requiredFields = [
        "title", "gsPapers", "subjects", "prelims",
        "mains", "essay", "importance", "reason",
        "sections", "oneLineSummary"
    ];

    for (let i = 0; i < data.topics.length; i++) {
        const topic = data.topics[i];
        const missing = requiredFields.filter(field => !(field in topic));

        if (missing.length > 0) {
            throw new Error(
                `Topic ${i + 1} ("${topic.title || "untitled"}") is missing fields: ${missing.join(", ")}`
            );
        }
    }
}

module.exports = { analyzeNewspaper };
