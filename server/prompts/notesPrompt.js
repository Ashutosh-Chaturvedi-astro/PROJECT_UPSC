const notesPrompt = (article, classification) => `
You are an expert UPSC faculty.

Generate concise, exam-oriented UPSC notes for the following newspaper article.

Classification:

${JSON.stringify(classification)}

IMPORTANT:
- Use the classification to understand the topic.
- Create headings that suit THIS topic.
- Do NOT use fixed headings.
- Return ONLY JSON.
- Do not return markdown.

Format:

{
  "title":"",
  "sections":[
      {
          "heading":"",
          "points":[
              "",
              "",
              ""
          ]
      }
  ],
  "oneLineSummary":""
}

Article:

${article}
`;

module.exports = notesPrompt;