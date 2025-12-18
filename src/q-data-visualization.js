export default function ({ user, weight = 1 }) {
  return {
    id: "data-visualization-dual-axis",
    weight,
    type: "textarea",
    question: `
A dashboard uses a dual Y-axis chart to show revenue and profit margin together.

Explain why this visualization can be misleading and suggest a clearer alternative.
    `,
    answer: `
Expected points:
• Scale distortion risk
• Misinterpretation of correlation
• Safer visualization approach
    `,
  };
}
