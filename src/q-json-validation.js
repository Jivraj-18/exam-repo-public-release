/**
 * Question: JSON Data Validation
 * Topic: JSON parsing and validation
 */

export default async function question() {
  return {
    id: "json-validation-missing-field",
    title: "JSON Data Validation",
    type: "short-answer",
    prompt: `You receive this JSON payload from an API:

\`\`\`json
{
  "user_id": 12345,
  "username": "alice",
  "created_at": "2025-01-15"
}
\`\`\`

Your application requires these fields: user_id, username, email, created_at

Which field is missing from the JSON payload?

Enter the exact field name.`,
    answer: "email",
    evaluate: async (userAnswer) => {
      const normalized = userAnswer.trim().toLowerCase();
      if (normalized === "email") {
        return { correct: true, feedback: "Correct! The 'email' field is required but missing from the payload." };
      }
      return { correct: false, feedback: `Incorrect. The missing required field is 'email', not '${userAnswer}'.` };
    },
    weight: 1
  };
}