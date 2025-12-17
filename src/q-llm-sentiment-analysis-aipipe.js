export default function ({ user, weight = 0.5 }) {
  return {
    id: "llm-sentiment-analysis-aipipe",
    title: "LLM Sentiment Analysis using AI Pipe",
    weight,

    description: `
Large Language Models (LLMs) can be used to perform sentiment analysis on text.
However, LLM APIs incur cost. For this course, students must use **aipipe.org**
as a proxy for OpenAI or OpenRouter models.

Using the AI Pipe setup:
- Replace the OpenAI base URL with https://aipipe.org/openrouter/v1
- Use your AIPIPE_TOKEN as the API key
- Use a supported chat model (e.g., google/gemini-2.0-flash-lite-001)

Task:
1. Send the following text to an LLM using the Chat Completions API:

   "The new update is fast and efficient, but the interface is confusing."

2. Ask the model to classify the sentiment as **Positive**, **Negative**, or **Neutral**.
3. Return ONLY the sentiment label.

Do not include any explanation or extra text.
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "One of: Positive, Negative, or Neutral"
    },

    grading: {
      type: "regex",
      pattern: "^(Positive|Negative|Neutral)$",
      caseSensitive: false,
      trim: true
    }
  };
}
