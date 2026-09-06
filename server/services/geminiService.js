/**
 * geminiService.js
 *
 * Low-level Gemini API client. All Gemini interactions go through here.
 */

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_CONFIG = {
    responseMimeType: "application/json",
    temperature: 0.3, // Lower temperature for more consistent, factual output
};

/**
 * Sends a plain text prompt to Gemini.
 * Used when the newspaper is provided as raw text.
 *
 * @param {string} prompt - The full prompt string with newspaper text embedded
 * @returns {string} Raw text response from Gemini
 */
async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: GEMINI_CONFIG,
    });

    return response.text;
}

/**
 * Sends a prompt + PDF buffer to Gemini as multimodal input.
 * Gemini reads the PDF natively — no text extraction needed.
 *
 * @param {string} prompt - The instruction prompt (no newspaper text embedded)
 * @param {Buffer} pdfBuffer - The raw PDF file buffer from Multer
 * @returns {string} Raw text response from Gemini
 */
async function generateContentWithPDF(prompt, pdfBuffer) {
    // Convert the buffer to base64 for Gemini's inlineData format
    const base64Pdf = pdfBuffer.toString("base64");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [
                    // Instruction prompt first
                    { text: prompt },
                    // PDF as inline base64 data (up to 50MB supported)
                    {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: base64Pdf,
                        },
                    },
                ],
            },
        ],
        config: GEMINI_CONFIG,
    });

    return response.text;
}

module.exports = { generateContent, generateContentWithPDF };