export default function ({ user, weight = 1 }) {
  return {
    id: "ai-coding-validation",
    weight,
    type: "textarea",
    question: `
An AI coding assistant generates Python code that executes successfully
but produces logically incorrect results.

Explain why such errors are dangerous and how they can be detected in practice.
    `,
    answer: `
Expected points:
• Silent failure risk
• Need for validation and tests
• Human-in-the-loop review
    `,
  };
}
