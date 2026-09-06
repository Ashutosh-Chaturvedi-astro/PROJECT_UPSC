const { generateContent } = require("./geminiService");
const classifyPrompt = require("../prompts/classifyPrompt");
const parseJson = require("../utils/parseJson");

async function classifyArticle(article) {
    const prompt = classifyPrompt(article);

    const response = await generateContent(prompt);

    return parseJson(response);
}

module.exports = {
    classifyArticle
};