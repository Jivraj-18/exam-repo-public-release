export default function ({ user, weight = 1 }) {
  return {
    id: "llm-binary-json",
    title: "LLM Binary Classification with Strict JSON",
    weight,
    prompt: `
You are building a moderation system using an LLM.

Write a prompt that forces the LLM to return ONLY the following JSON format:

{
  "allowed": true | false
}

Rules:
- No extra text
- No explanations
- JSON must be valid
- allowed=true ONLY if the input text is safe

Your prompt must include instructions that strictly enforce this output.
    `,
    answer: `
You must respond ONLY with valid JSON in this exact format:
{"allowed":true|false}

Do not include explanations, text, or formatting.
If the content is unsafe, set allowed to false.
    `.trim(),
  };
}
