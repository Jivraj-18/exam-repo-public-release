export default async function ({ user, weight = 1 }) {
  const data = [
    { cohort: "2024-01", month: 0, active: 100 },
    { cohort: "2024-01", month: 1, active: 78 },
    { cohort: "2024-01", month: 2, active: 67 },

    { cohort: "2024-02", month: 0, active: 120 },
    { cohort: "2024-02", month: 1, active: 95 },
    { cohort: "2024-02", month: 2, active: 82 },
  ];

  const answer = 0.67;

  return {
    id: "python_cohort_retention",
    weight,
    question: `
A subscription company tracks active users by signup cohort.

**Task**
1. Load the dataset into Pandas.
2. Compute **Month 2 retention** for the **earliest cohort (2024-01)**.

Retention = active users at month 2 ÷ users at month 0.

**Data**
\`\`\`
${JSON.stringify(data, null, 2)}
\`\`\`

Return the answer as a **decimal rounded to 2 places**.
    `,
    answer,
    validate: (input) =>
      Math.abs(parseFloat(input) - answer) < 0.01,
  };
}
