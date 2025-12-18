export default function ({ user, weight }) {
  return {
    id: "sql_analysis",
    weight,
    question: `
Given a table sales(region, revenue, cost):

Write a SQL query that:
• Computes profit as (revenue - cost)
• Aggregates total profit per region
• Returns only regions with total profit greater than 100000
• Orders the result by profit in descending order
`,
    type: "textarea",
    answerIncludes: ["GROUP BY", "SUM", "ORDER BY"],
  };
}
