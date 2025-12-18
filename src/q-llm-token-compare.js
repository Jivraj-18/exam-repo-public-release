export default function ({ user, weight = 1 }) {
  return {
    id: "llm-token-compare",
    title: "LLM Token Cost Comparison",
    weight,
    prompt: `
You send two prompts to gpt-4o-mini:

Prompt A:
"Summarize machine learning."

Prompt B:
"Summarize machine learning in exactly 5 bullet points, each under 10 words."

Which prompt will consume MORE input tokens, and why?

Answer with:
A or B, followed by a one-line reason.
    `,
    answer: "B - it contains more instructions and constraints, increasing token count",
  };
}
