const { generateContent } = require("./geminiService");
const notesPrompt = require("../prompts/notesPrompt");
const parseJson = require("../utils/parseJson");

async function generateNotes(article, classification) {

    const prompt = notesPrompt(article, classification);

    const response = await generateContent(prompt);

    return parseJson(response);

}

module.exports = {
    generateNotes
};