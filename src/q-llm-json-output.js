export default {
  id: "llm-json-output",
  title: "LLM Prompt for JSON Output",
  description: "Design prompts that force structured JSON responses from an LLM.",
  question: `
Write a prompt that instructs a Large Language Model to analyze a given text
and return the result strictly in the following JSON format:

{
  "sentiment": "positive | negative | neutral",
  "confidence": number
}

Ensure the model does not return any extra text.
`,
  answer: `
Analyze the following text and return ONLY a valid JSON object
with the following structure:

{
  "sentiment": "positive | negative | neutral",
  "confidence": number
}

Do not include explanations or additional text.
`
};
