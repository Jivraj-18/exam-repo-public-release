export default function ({ user, weight }) {
  return {
    id: "llm-prompt-pattern",
    weight,
    question: `
      <h2>LLM Prompt Engineering</h2>
      <p><strong>Difficulty:</strong> 3</p>
      <p><strong>Personalized:</strong> No</p>

      <p>Which prompt pattern best reduces hallucinations?</p>

      <ol>
        <li>A. Asking for creative output</li>
        <li>B. Providing vague instructions</li>
        <li>C. Asking for step-by-step reasoning</li>
        <li>D. Using random examples</li>
      </ol>

      <p><strong>Submit only the option letter</strong></p>
    `,
    validate: (answer) => {
      if (answer.trim().toUpperCase() === "C") {
        return { correct: true };
      }
      return {
        correct: false,
        feedback: "Correct answer is C (step-by-step reasoning)",
      };
    },
  };
}
