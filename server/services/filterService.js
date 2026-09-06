const { generateContent } = require("./geminiService");
const filterPrompt = require("../prompts/filterPrompt");
const parseJson = require("../utils/parseJson");

async function filterNewspaper(newspaper) {
    const prompt = filterPrompt(newspaper);

    const response = await generateContent(prompt);

    return parseJson(response);
}

module.exports = {
    filterNewspaper
};