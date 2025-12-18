export default function ({ user, weight }) {
  return {
    id: "llm-system-prompt-guardrails",
    weight,

    question: `
Write a **system prompt** (5–10 lines) for an AI assistant that helps with
**data cleaning in Python**.

It MUST include:
• Asking clarifying questions
• Never fabricating results
• Stating assumptions explicitly
• Preferring pandas for data work

Paste only the system prompt text.
`,

    validate: (answer) => {
      if (!answer) return "System prompt required";

      const text = answer.toLowerCase();
      const required = [
        "clarif",
        "never",
        "fabric",
        "assum",
        "pandas",
      ];

      const missing = required.filter((k) => !text.includes(k));
      return missing.length === 0
        ? true
        : "Prompt is missing one or more required constraints.";
    },
  };
}
