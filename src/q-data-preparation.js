export default function ({ user, weight = 1 }) {
  return {
    id: "data-preparation-scaling",
    weight,
    type: "textarea",
    question: `
A dataset contains numerical features with very different ranges
(e.g., age, income, and probability scores).

Explain why feature scaling is important and describe a scenario
where scaling may not be required.
    `,
    answer: `
Expected points:
• Effect of scale on model behavior
• Common scaling techniques
• Tree-based model exception
    `,
  };
}
