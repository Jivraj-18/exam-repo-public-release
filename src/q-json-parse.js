export default {
    id: "json-parse",
    title: "JSON Parsing",
    description: "Extract a value from a JSON object.",
    question: \`
Given the following JSON object:
\`\`\`json
{
  "user": {
    "name": "Alice",
    "location": {
      "city": "Wonderland"
    }
  }
}
\`\`\`
Write the dot notation path to access "Wonderland".
\`,
  answer: \`
data.user.location.city
\`
};
