/**
 * parseJson.js
 *
 * Robustly extracts and parses JSON from Gemini API responses.
 * Handles common issues like markdown wrappers and surrounding text.
 */

function parseJson(text) {
    if (!text || typeof text !== "string") {
        throw new Error("Gemini returned an empty or non-string response.");
    }

    // Step 1: Strip markdown code fences (```json ... ``` or ``` ... ```)
    let cleaned = text
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

    // Step 2: Try direct parse first (fastest path)
    try {
        return JSON.parse(cleaned);
    } catch (_) {
        // Continue to extraction strategies
    }

    // Step 3: Try to extract a JSON object { ... } from surrounding text
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objectMatch) {
        try {
            return JSON.parse(objectMatch[0]);
        } catch (_) {
            // Continue
        }
    }

    // Step 4: Try to extract a JSON array [ ... ] from surrounding text
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
        try {
            return JSON.parse(arrayMatch[0]);
        } catch (_) {
            // Continue
        }
    }

    // Step 5: All strategies failed — throw with a snippet for debugging
    const snippet = text.substring(0, 200);
    throw new Error(
        `Failed to parse JSON from Gemini response. Raw text starts with:\n${snippet}`
    );
}

module.exports = parseJson;