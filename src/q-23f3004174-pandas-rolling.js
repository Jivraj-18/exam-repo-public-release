export default {
  id: "23f3004174-pandas-window",
  title: "Rolling Average Sales Analysis",
  difficulty: 3,
  tags: ["python", "pandas"],

  description: `
You are given daily sales data.

Task:
Compute a 7-day rolling average of revenue
and report the maximum rolling average value.
  `,

  input: { type: "file", extensions: [".csv"] },

  questions: [
    {
      id: "max-rolling",
      text: "What is the maximum 7-day rolling average revenue?",
      type: "number",
      tolerance: 0.01,
    },
  ],
};
