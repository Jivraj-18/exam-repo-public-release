export default function ({ user, weight }) {
  const rows = [
    { category: "A", value: 120 },
    { category: "B", value: 90 },
    { category: "A", value: 30 },
    { category: "C", value: 60 },
    { category: "B", value: 10 },
  ];

  return {
    id: "csv-aggregate",
    weight,
    question: `
      <h2>CSV Aggregation Task</h2>
      <p><strong>Difficulty:</strong> 2</p>
      <p><strong>Personalized:</strong> No</p>

      <p>You are given rows extracted from a CSV file:</p>

      <pre>${JSON.stringify(rows, null, 2)}</pre>

      <ol>
        <li>Group rows by <code>category</code></li>
        <li>Compute the total <code>value</code> for each category</li>
        <li>Return the category with the <strong>highest total value</strong></li>
      </ol>

      <p><strong>Submit only the category name</strong> (e.g., A, B, C)</p>
    `,
    validate: (answer) => {
      const totals = rows.reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + r.value;
        return acc;
      }, {});

      const expected = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];

      if (answer.trim() === expected) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: `Expected "${expected}". Totals: ${JSON.stringify(totals)}`,
      };
    },
  };
}
