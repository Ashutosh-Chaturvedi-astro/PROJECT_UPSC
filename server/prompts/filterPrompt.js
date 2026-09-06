const filterPrompt = (newspaper) => `
You are a UPSC mentor.

Given the complete newspaper below, identify ONLY the news topics that are relevant for UPSC CSE.

Ignore:
- Sports
- Entertainment
- Crime
- Local politics
- Advertisements
- Stock market updates
- Celebrity news
- Routine political statements

Return ONLY a JSON array.

Example:

[
  {
    "title": "India-Indonesia Relations",
    "article": "Complete article text..."
  },
  {
    "title": "AI Governance",
    "article": "Complete article text..."
  }
]

Newspaper:

${newspaper}
`;

module.exports = filterPrompt;