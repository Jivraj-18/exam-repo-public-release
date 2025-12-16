

export default function ({ weight = 1 }) {
  return {
    id: "logical_equivalence",
    question: html`
      <p>
        Which of the following is logically equivalent to:
      </p>
      <p><b>¬(P ∧ Q)</b></p>
      <p>Answer exactly (example: ¬P ∨ ¬Q)</p>
    `,
    answer: "¬P ∨ ¬Q",
    weight,
  };
}
