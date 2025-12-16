export default {
  id: "23f3004174-visual-insight",
  title: "Interpret Business Dashboard Trends",
  difficulty: 1,
  tags: ["visualization", "interpretation"],

  description: `
A line chart shows monthly revenue for a year.

Tasks:
1. Identify the month with highest revenue
2. Identify the overall trend (increasing/decreasing/mixed)
  `,

  questions: [
    {
      id: "best-month",
      text: "Which month shows the highest revenue?",
      type: "text",
    },
    {
      id: "trend",
      text: "What is the overall trend?",
      type: "choice",
      choices: ["Increasing", "Decreasing", "Mixed"],
    },
  ],
};
