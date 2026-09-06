/**
 * analyzePdfService.js
 *
 * Service that handles PDF-based newspaper analysis.
 * Sends the PDF directly to Gemini as base64 inlineData —
 * no text extraction needed.
 */

const { generateContentWithPDF } = require("./geminiService");
const analyzePdfPrompt = require("../prompts/analyzePdfPrompt");
const parseJson = require("../utils/parseJson");

/**
 * Analyzes a newspaper PDF and returns structured UPSC notes.
 * Gemini reads the PDF natively, handling multi-column layouts.
 *
 * @param {Buffer} pdfBuffer - Raw PDF file buffer from Multer
 * @returns {object} Parsed JSON with topics array
 * @throws {Error} If Gemini call fails or response is invalid
 */
async function analyzeNewspaperPdf(pdfBuffer) {
    // Get the pure instruction prompt (no newspaper text embedded)
    const prompt = analyzePdfPrompt();

    // Single Gemini call with PDF as inlineData
    const rawResponse = await generateContentWithPDF(prompt, pdfBuffer);

    // Parse JSON from Gemini's response
    const parsed = parseJson(rawResponse);

    // Validate structure
    validateResponse(parsed);

    return parsed;
}

/**
 * Validates the Gemini response has the expected schema.
 *
 * @param {object} data - Parsed JSON from Gemini
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
        throw new Error(
            "Gemini returned zero topics. The PDF may not contain UPSC-relevant content."
        );
    }

    const requiredFields = [
        "title", "gsPapers", "subjects", "prelims",
        "mains", "essay", "importance", "reason",
        "sections", "oneLineSummary",
    ];

    for (let i = 0; i < data.topics.length; i++) {
        const topic = data.topics[i];
        const missing = requiredFields.filter((field) => !(field in topic));

        if (missing.length > 0) {
            throw new Error(
                `Topic ${i + 1} ("${topic.title || "untitled"}") is missing fields: ${missing.join(", ")}`
            );
        }
    }
}

module.exports = { analyzeNewspaperPdf };
