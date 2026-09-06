const classifyPrompt = (article) => `
You are an expert UPSC CSE mentor.

Analyze the newspaper article and classify it according to the UPSC syllabus.

Return ONLY valid JSON.

{
  "gsPapers": ["GS II", "GS III"],
  "subjects": [
    "International Relations",
    "Governance"
  ],
  "prelims": true,
  "mains": true,
  "essay": false,
  "importance": 5,
  "reason": "Short reason"
}

Rules:
- gsPapers must be an array.
- Multiple GS papers are allowed.
- subjects must be an array.
- importance must be between 1 and 5.
- Return only JSON.
- Do not use markdown.

Article:

${article}
`;

module.exports = classifyPrompt;